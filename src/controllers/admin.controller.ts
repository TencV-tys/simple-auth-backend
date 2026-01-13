import { Request,Response } from "express";
import { AdminServices } from "../services/admin.services";

export class AdminController{

         static async getAllUsers(req:Request,res:Response){
             try{
                 
              const page = parseInt(req.query.page as string) || 1;
              const limit = parseInt(req.query.limit as string ) || 10;


                const userResult = await AdminServices.getAllUser(page,limit);
                
                if(!userResult.success)return res.status(401).json({
                    success:false,
                    message:userResult.message
                })

                return res.json({
                    success:true,
                    message:userResult.message,
                    user:userResult.user,
                    pagination:userResult.pagination
                })


              }catch(e){
                console.error(e);
                return res.status(500).json({
                    success:false,
                    message:"Server error"
                })
             }

                

         }
              

         static async getDeleteUser(req:Request, res:Response){
              try{
                   const {userId} = req.params;
                   
                   const result = await AdminServices.deleteUser(parseInt(userId));

                   if(!result.success){
                    res.status(401).json({
                        success:false,
                        message:result.message
                    });
                   }


                   res.json({
                      success:true,
                      message:result.message
                   });
                   
                
              }catch(e){
                console.error(e);
                res.status(500).json({
                    success:true,
                    message:"Server error"
                });
              }
              

         }


}