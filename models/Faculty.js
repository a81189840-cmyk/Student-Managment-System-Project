import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const facultySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        employeeId: { type: String, required: true, unique: true, trim: true },
        department: { type: String, required: true, trim: true },
        specialization : { type: String, required: true, trim: true },
        experience: { type: Number, required: true },
        password : { type: String, required: true},
        role: { type: String, enum: ['faculty', 'admin'], default: 'faculty'}
    },
    {
        timestamps: true
    }
);
const Faculty = model('Faculty', facultySchema);
export default Faculty;


