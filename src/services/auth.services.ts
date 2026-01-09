import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import {
SignupData,
LoginData,
AuthResponse,
TokenPayload
} from '../interfaces/auth.interface';


export class AuthServices{
   
     static async signup(data:SignupData):Promise<AuthResponse>{
        try{
             const{name, email, password} = data;

             if(!name||!email||!password){
                return{
                    success:false,
                    message:"All fields are required"
                }
             }

             const existingUser = await prisma.user.findUnique({
                where:{email}
             });

             if(!existingUser)return{success:false,message:"Email already exists"};

             const hashedPassword = await bcrypt.hash(password,10);

             const user = await prisma.user.create({
                data:{
                    name,
                    email,
                    password:hashedPassword
                }
             });

             const token = this.generateToken(user.id,user.role);

             return{
                success:true,
                message:"Signup Successfully",
                token,
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
             };


        }catch(e:unknown){
            console.error(`Signup error: ${e}`);
            return{
                success:false,
                message:"Signup Failed"
            }
        }


    }

   static async login(data:LoginData):Promise<AuthResponse>{
    try{
        const {email,password} = data;
        
        if(!email||!password){
            return {
                success:false,
                message:"All fields are required"
            };
        }

        const user = await prisma.user.findUnique({
            where:{email}
        });
        if(!user)return {success:false,message:"Invalid credentials"};
        
        const userFound = await bcrypt.compare(password,user.password);

        if(!userFound) return {success:false,message:"User not found"};

        const token = this.generateToken(user.id,user.role);

        return {
            success:true,
            message:"Login successfully",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        };



    }catch(e:unknown){
        console.error(`Error:${e}`);
        return{
            success:false,
            message:"Login Failed"
        }
    }

   }


       

    static generateToken(userId:number,role:string):string{
          return jwt.sign(
            {userId,role},
            process.env.JWT_SECRET!,
            {expiresIn:"15m"}
          );
    }
   
    static verifyToken(token:string):TokenPayload | null{
        try{
             return jwt.verify(token,process.env.JWT_SECRET!) as TokenPayload;
        }catch(e){
             return null;
        }
    }

    static async logout(userId:number):Promise<AuthResponse>{
        try{
           return{
            success:true,
            message:"Logged out successfully"
           }
        }catch(e){
           return {
            success:false,
            message:"Logout Failed"
           }
        }
    }

}
