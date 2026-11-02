import Faculty from "../models/Faculty.js";
import bcrypt from "bcryptjs";
export const createFaculty = async (req, res) => {
    try {
        const data = { ...req.body };
        data.role = "faculty";
        data.password = await bcrypt.hash(data.password, 10);
        const faculty = await Faculty.create(data);
        const safeFaculty = faculty.toObject();
        delete safeFaculty.password;
        return res.status(201).json({ message: "Faculty created successfully", data: safeFaculty });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email or Employee ID already exists" });
        }
        return res.status(400).json({ message: error.message });
    }
};
export const getAllFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find().select("-password");
        return res.status(200).json({ count: faculty.length, data: faculty });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id).select("-password");
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        return res.status(200).json({ data: faculty });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
export const updateFaculty = async (req, res) => {
    try {
        const data = { ...req.body };
        delete data.role;
        if (data.password) { data.password = await bcrypt.hash(data.password, 10); }
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true, projection: { password: 0 } });
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        return res.status(200).json({ message: "Faculty updated successfully", data: faculty });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email or Employee ID already exists" });
        }
        return res.status(400).json({ message: error.message });
    }
};
export const deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        return res.status(200).json({ message: "Faculty deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};