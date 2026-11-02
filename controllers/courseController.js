import Course from "../models/Courses.js";
export const createCourse = async (req, res) => {
    try {
        const data = req.body;
        const course = await Course.create(data);
        res.status(201).json({ message: "Course created successfully", data: course });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ count: courses.length, data: courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ data: course });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const data = req.body;
        const course = await Course.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course updated successfully", data: course });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
