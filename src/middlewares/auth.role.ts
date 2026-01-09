import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const requireRole = (role:"ADMIN"| "USER")=>{
    return (req: AuthRequest, res: Response, next: NextFunction)=>{
        if(req.role !== role) return res.status(403).json({message:"Forbidden"});
        next();
    }
}