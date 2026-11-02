import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const courseSchema = new Schema(
    {
        courseName: { type: String, required: true, trim: true, unique: true,},
        courseCode: { type: String, required: true, trim: true },
        department: { type: String, required: true, trim: true },
        semester: { type: Number, required: true, min: 1, max: 8 },
        credits: { type: Number, required: true },
        description: { type: String, required: true, trim: true }
    },
    {
        timestamps: true
    }
);
const Course = model('Course', courseSchema);
export default Course;