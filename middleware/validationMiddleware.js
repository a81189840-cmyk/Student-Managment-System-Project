export const validateRegistration = (req, res, next) => {
    try {
        const { name, email, password, role, profile } = req.body;
        if (!name || !email || !password || !role || !profile) {
            return res.status(400).json({ message: "Name, email, password, role and profile are required" });
        }
        if (typeof name !== "string" || name.trim().length < 2) {
            return res.status(400).json({ message: "Name must contain at least 2 characters" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof email !== "string" || !emailRegex.test(email.trim())) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }
        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if (!["student", "faculty"].includes(role)) {
            return res.status(400).json({ message: "Role must be student or faculty" });
        }
        if (
            typeof profile !== "object" || profile === null || Array.isArray(profile)) {
            return res.status(400).json({ message: "Profile must be a valid JSON object" });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid registration data" });
    }
};
export const validateStudent = (req, res, next) => {
    const { name, email, phone, DOB, address, enrollmentNumber, department, semester, password } = req.body;
    if (!name || !email || !phone || !DOB || !address || !enrollmentNumber || !department || semester === undefined || !password) {
        return res.status(400).json({ message: "All student fields are required" });
    }
    if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({ message: "Student name must contain at least 2 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email.trim())) {
        return res.status(400).json({ message: "Please provide a valid email address" });
    }
    if (typeof phone !== "string" || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({ message: "Phone number must contain exactly 10 digits" });
    }
    if (typeof address !== "string" || address.trim().length < 3) {
        return res.status(400).json({ message: "Please provide a valid address" });
    }
    if (typeof enrollmentNumber !== "string" || enrollmentNumber.trim().length < 3) {
        return res.status(400).json({ message: "Please provide a valid enrollment number" });
    }
    if (typeof department !== "string" || department.trim().length < 2) {
        return res.status(400).json({ message: "Please provide a valid department" });
    }
    if (!Number.isInteger(semester) || semester < 1 || semester > 8) {
        return res.status(400).json({ message: "Semester must be a number between 1 and 8" });
    }
    if (typeof password !== "string" || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const dobDate = new Date(DOB);
    if (typeof DOB !== "string" || Number.isNaN(dobDate.getTime()) || dobDate.toISOString().slice(0, 10) !== DOB || dobDate >= new Date()) {
        return res.status(400).json({ message: "Please provide a valid past date of birth in YYYY-MM-DD format" });
    }
    next();
};

export const validateFaculty = (req, res, next) => {
    const { name, email, employeeId, department, specialization, experience, password } = req.body;
    if (!name || !email || !employeeId || !department || !specialization || experience === undefined || experience === null || !password) {
        return res.status(400).json({ message: "All faculty fields are required" });
    }
    if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({ message: "Faculty name must contain at least 2 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email.trim())) {
        return res.status(400).json({ message: "Please provide a valid faculty email address" });
    }
    if (typeof employeeId !== "string" || employeeId.trim().length < 3) {
        return res.status(400).json({ message: "Employee ID must contain at least 3 characters" });
    }
    if (typeof department !== "string" || department.trim().length < 2) {
        return res.status(400).json({ message: "Please provide a valid department" });
    }
    if (typeof specialization !== "string" || specialization.trim().length < 2
    ) {
        return res.status(400).json({ message: "Specialization must contain at least 2 characters" });
    }
    if (typeof experience !== "number" || !Number.isFinite(experience) || experience < 0
    ) {
        return res.status(400).json({ message: "Experience must be a non-negative number" });
    }
    if (typeof password !== "string" || password.length < 6
    ) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    next();
};
