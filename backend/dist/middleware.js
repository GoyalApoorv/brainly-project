"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    console.log("=== MIDDLEWARE STARTED ===");
    console.log("Headers:", req.headers);
    console.log("Authorization header:", req.headers.authorization);
    try {
        const header = req.headers["authorization"];
        if (!header) {
            console.log("ERROR: No authorization header");
            res.status(401).json({ message: 'Authorization header missing' });
            return;
        }
        const token = header.split(' ')[1];
        console.log("Extracted token:", token);
        if (!token) {
            console.log("ERROR: No token after split");
            res.status(401).json({ message: 'Token missing' });
            return;
        }
        console.log("About to verify token with JWT_PASSWORD:", process.env.JWT_PASSWORD ? "EXISTS" : "MISSING");
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD);
        console.log("Token decoded successfully:", decoded);
        req.userId = decoded.id;
        console.log("Calling next() - moving to route handler");
        next();
    }
    catch (error) {
        const err = error;
        console.log("MIDDLEWARE ERROR:", err.message);
        res.status(403).json({ message: 'Invalid token', error: err.message });
        return;
    }
};
exports.userMiddleware = userMiddleware;
