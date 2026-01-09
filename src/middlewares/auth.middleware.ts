import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload{
    userId:number;
    role:"USER"|"ADMIN";
}

export interface AuthRequest extends Request{
    userId?:number;
    role?:"USER"|"ADMIN"
}

const authMiddleware = ( req: AuthRequest, res: Response, next: NextFunction) => {
        
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json({message:"Unauthorized"});


    try{
         const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!,
         ) as JwtPayload;

         req.userId = decoded.userId;
         req.role = decoded.role as any;
         next();
    }catch(e){
        res.status(401).json({message:"Invalid credentials"});
    }
    

}

export default authMiddleware;
