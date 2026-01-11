import { Request, Response } from "express";
import { AuthServices } from "../services/auth.services";

class AuthController{

      static async signup (req:Request, res:Response){
         try{
              const {name , email, password} = req.body;
               
              const result = await AuthServices.signup({name,email,password});
                
              if(!result.success){
                return res.status(400).json({
                  success:false,
                  message:result.message
                });
              }
              
         
               if(!result.token){
                return res.status(500).json({
                  success:false,
                  message:"Token generation failed"
                });
               }

               res.cookie("accessToken", result.token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                sameSite:"strict",
                maxAge: 15 * 60 * 1000
               });

               res.status(201).json({
                success:true,
                message:result.message,
                user:result.user
              });
                         
            
         }catch(e){
             res.status(500).json({
              success:false,
                message:"Signup failed" 
             });
         }

      }  

     static async login (req:Request, res:Response){
       try{
           const {email,password} = req.body;
           
        const result = await AuthServices.login({email,password});

        if(!result.success){
          return res.status(400).json({
            success:false,
            message:result.message
          })
        }
       if(!result.token){
        return res.status(500).json({
          success:false,
          message:"Token generation failed"
        });
       }
        res.cookie("accessToken",result.token,{
          httpOnly:true,
          secure:process.env.NODE_ENV === 'production',
          sameSite:'strict',
          maxAge: 15 * 60 * 1000
        });


        res.json({
          success:true,
          message:result.message,
          user:result.user
        });

       }catch(e){
        console.error("Login controller failed");
            res.status(500).json({
              success:false,
              message:"Login Failed"});
         }

     }

     static async logout(req:Request,res:Response){
      try{
       res.clearCookie("accessToken");
       const token = req.cookies.accessToken;

       if(token){
        const payload = AuthServices.verifyToken(token);
        if(payload){
          await AuthServices.logout(payload.userId);
        }
       } 
          res.json({
            success:true,
            message:"Logged out successfully"
          })
      }catch(e){
          console.error(`Error in Logged out controller`);
          res.status(500).json({
            success:false,
            message:"Internal server error"
          })        
      }

     }

 
     static async getCurrentUser(req:Request, res:Response){
          try{
                const token = req.cookies.accessToken;
                 
                const result = await AuthServices.getCurrentUser(token);

                if(!result.success){
                  return res.status(401).json({
                    success:false,
                    message:result.message
                  })
                } 

                res.json({
                  success:true,
                  user:result.user
                })

          }catch(e){
                console.error("Get curent user",e);
                res.status(500).json({
                  message:"Internal server error"
                });
          }

     }



}

export default AuthController;