import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication token is required" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(401).json({ message: "Authentication required" });
        }
        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({ message: "You do not have permission to perform this action" });
        }
        next();
    };
};