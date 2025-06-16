import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_PASSSWORD } from "./config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]
    const token = header && header.split(' ')[1]
    const decoded = jwt.verify(token as string, JWT_PASSSWORD)

    if(decoded) {
        //@ts-ignore
        req.userId = decoded.id
    } else {
        res.status(403).json({
            message: 'You are not signed in' 
        })
    } 
}
