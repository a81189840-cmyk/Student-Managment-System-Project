import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    try {
        const data = req.body;
        const { name, email, password, role, profile } = data;
        if (role !== "student" && role !== "faculty") {
            return res.status(400).json({ message: "Role must be student or faculty" });
        }
        if (!name || !email || !password || !profile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingStudent = await Student.findOne({ email: normalizedEmail });
        const existingFaculty = await Faculty.findOne({ email: normalizedEmail });
        if (existingStudent || existingFaculty) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (role === "student") {
            const studentData = {
                ...profile, name: name.trim(), email: normalizedEmail, password: hashedPassword, role: "student"
            };
            const student = await Student.create(studentData);
            return res.status(201).json({
                message: "Student registered successfully",
                user: { id: student._id, name: student.name, email: student.email, role: student.role }
            });

        }
        else {
            const facultyData = { ...profile, name: name.trim(), email: normalizedEmail, password: hashedPassword, role: "faculty" };
            const faculty = await Faculty.create(facultyData);
            return res.status(201).json({
                message: "Faculty registered successfully",
                user: { id: faculty._id, name: faculty.name, email: faculty.email, role: faculty.role }
            });
        }

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email, phone, or enrollment number already exists" });
        }
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = data;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const normalizedEmail = email.trim().toLowerCase();
        let user = await Student.findOne({ email: normalizedEmail });
        let role = "student";
        if (!user) {
            user = await Faculty.findOne({ email: normalizedEmail });
            role = "faculty";
        }
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { userId: user._id.toString(), role: role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );
        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, role }
        });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const { userId, role } = req;
        if (!userId || !role) {
            return res.status(401).json({ message: "User authentication required" });
        }
        let user;
        if (role === "student") {
            user = await Student.findById(userId).select("-password");
        } else if (role === "faculty") {
            user = await Faculty.findById(userId).select("-password");
        } else {
            return res.status(400).json({ message: "Invalid user role" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User details fetched successfully", user
        });
    } catch (error) {
        console.error("Get current user error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateCurrentUser = async (req, res) => {
    try {
        const { userId, role } = req;
        const updates = req.body;
        if (!userId || !role) {
            return res.status(401).json({ message: "User authentication required" });
        }
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "Please provide fields to update" });
        }
        const allowedStudentFields = ["name", "phone", "DOB", "address", "department", "semester"];
        const allowedFacultyFields = ["name", "department", "specialization", "experience"];
        let allowedFields;
        let Model;
        if (role === "student") {
            allowedFields = allowedStudentFields;
            Model = Student;
        } else if (role === "faculty") {
            allowedFields = allowedFacultyFields;
            Model = Faculty;
        } else {
            return res.status(400).json({ message: "Invalid user role" });
        }
        const invalidFields = Object.keys(updates).filter(
            field => !allowedFields.includes(field)
        );
        if (invalidFields.length > 0) {
            return res.status(400).json({ message: "Some fields cannot be updated", fields: invalidFields });
        }
        if (
            updates.name !== undefined &&
            (typeof updates.name !== "string" || !updates.name.trim())
        ) {
            return res.status(400).json({ message: "Name must be a non-empty string" });
        }
        if (
            updates.department !== undefined &&
            (typeof updates.department !== "string" || !updates.department.trim())
        ) {
            return res.status(400).json({ message: "Department must be a non-empty string" });
        }
        if (role === "student" && updates.semester !== undefined) {
            const semester = Number(updates.semester);
            if (
                !Number.isInteger(semester) || semester < 1 || semester > 8) {
                return res.status(400).json({ message: "Semester must be between 1 and 8" });
            }
            updates.semester = semester;
        }
        if (role === "faculty" && updates.experience !== undefined) {
            const experience = Number(updates.experience);
            if (!Number.isFinite(experience) || experience < 0) {
                return res.status(400).json({
                    message: "Experience must be a non-negative number"
                });
            }
            updates.experience = experience;
        }
        if (updates.name !== undefined) { updates.name = updates.name.trim(); }
        if (updates.department !== undefined) { updates.department = updates.department.trim(); }
        const user = await Model.findByIdAndUpdate(userId, { $set: updates },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Update profile error:", error.message);
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(409).json({ message: "A unique field already exists" });
        }
        return res.status(500).json({ message: "Server error" });
    }
};