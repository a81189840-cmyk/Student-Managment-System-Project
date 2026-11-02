import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
export const createStudent = async (req, res) => {
    try {
        const data = { ...req.body };
        data.role = "student";
        data.password = await bcrypt.hash(data.password, 10);
        const student = await Student.create(data);
        const safeStudent = student.toObject();
        delete safeStudent.password;
        return res.status(201).json({ message: "Student created successfully", data: safeStudent });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email, phone, or enrollment number already exists" });
        }
        return res.status(400).json({ message: error.message });
    }
};
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select("-password");
        return res.status(200).json({ count: students.length, data: students });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select("-password");
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ data: student });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
export const updateStudent = async (req, res) => {
    try {
        const data = { ...req.body };
        delete data.role;
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const student = await Student.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true, projection: { password: 0 } });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student updated successfully", data: student });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email, phone, or enrollment number already exists" });
        }
        return res.status(400).json({ message: error.message });
    }
};
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};