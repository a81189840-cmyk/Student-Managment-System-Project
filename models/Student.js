import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const studentSchema = new Schema(
    {
        name: {type: String,required: true,trim: true},
        email: {type: String,required: true,unique: true,lowercase: true,trim: true},
        phone: {type: String,required: true,unique: true,trim: true},
        DOB: {type: Date,required: true},
        address: {type: String,required: true,trim: true},
        enrollmentNumber: {type: String,required: true,unique: true,trim: true},
        department: {type: String,required: true,trim: true},
        semester: {type: Number,required: true,min: 1,max: 8},
        status: {type: String,enum: ['Active', 'Inactive', 'Graduated'],default: 'Active'},
        password: {type: String,required: true},
        role : {type : String,enum : ['student','faculty'], required : true,  default: 'student'}
    },
    {
        timestamps: true
    }
);
const Student = model('Student', studentSchema);
export default Student;