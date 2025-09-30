import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export {}; // Make it a module

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD) as any;
        console.log("Token decoded successfully:", decoded);
        
        req.userId = decoded.id;
        console.log("Calling next() - moving to route handler");
        next();
        
    } catch (error) {
         const err = error as Error; 
        console.log("MIDDLEWARE ERROR:", err.message);
        res.status(403).json({ message: 'Invalid token', error: err.message });
        return;
    }
}