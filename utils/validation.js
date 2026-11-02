// export const isValidName = (name) => {
//     return (typeof name === "string" && name.trim().length >= 2
//     );
// };
// export const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return (typeof email === "string" && emailRegex.test(email.trim()));
// };
// export const isValidPassword = (password) => {
//     return (typeof password === "string" && password.length >= 6);
// };
// export const isValidPhone = (phone) => {
//     return (typeof phone === "string" && /^\d{10}$/.test(phone));
// };
// export const isValidDOB = (DOB) => {
//     if (typeof DOB !== "string" || DOB.trim() === "") { return false; }
//     const date = new Date(DOB);
//     return (!Number.isNaN(date.getTime()) && date < new Date());
// };
// export const isValidAddress = (address) => {
//     return (typeof address === "string" && address.trim().length >= 5
//     );
// };
// export const isValidEnrollmentNumber = (enrollmentNumber) => {
//     return (typeof enrollmentNumber === "string" && enrollmentNumber.trim().length >= 2);
// };
// export const isValidDepartment = (department) => {
//     return (typeof department === "string" && department.trim().length >= 2);
// };
// export const isValidSemester = (semester) => {
//     return (Number.isInteger(semester) && semester >= 1 && semester <= 8);
// };
// export const isValidCourseName = (courseName) => {
//     return (typeof courseName === "string" && courseName.trim().length >= 2
//     );
// };
// export const isValidCourseCode = (courseCode) => {
//     return (typeof courseCode === "string" && courseCode.trim().length >= 2);
// };
// export const isValidDescription = (description) => {
//     return (typeof description === "string" && description.trim().length >= 10
//     );
// };
// export const isValidCredits = (credits) => {
//     return (Number.isInteger(credits) && credits > 0
//     );
// };
// export const isValidFacultyName = (name) => {
//     return (typeof name === "string" && name.trim().length >= 2);
// };
// export const isValidFacultyEmail = (email) => {
//     return isValidEmail(email);
// };

// export const isValidFacultyDepartment = (department) => {
//     return (typeof department === "string" && department.trim().length >= 2
//     );
// };
// export const isValidEmployeeId = (employeeId) => {
//     return (typeof employeeId === "string" && employeeId.trim().length >= 2
//     );
// };
// export const isValidSpecialization = (specialization) => {
//     return (typeof specialization === "string" && specialization.trim().length >= 2
//     );
// };
// export const isValidExperience = (experience) => {
//     return (Number.isFinite(experience) && experience >= 0);
// };