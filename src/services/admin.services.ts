import prisma from "../prisma";

export class AdminServices{

      static async getAllUser(){
           
        try{
               const users = await prisma.user.findMany({
                select:{
                    id:true,
                    name:true,
                    email:true,
                    role:true,
                    createdAt:true
                },
                orderBy:{
                    createdAt:'desc'
                }
               });
               
               return{
                success:true,
                user:users
               }

        }catch(e){
              console.error(e);

              return{
                success:false,
                message:"Internal server error"
              }
        }
              
      }


      static async deleteUser(id:number){
        try{
             const user = await prisma.user.findUnique({
                where:{id:id}
             });
             
             if(!user){
                return{
                    success:false,
                    message:"User not found"
                }
             }

            
             await prisma.user.delete({
                where:{id:id}
             });

             return{
                success:true,
                message:"User deleted successfully"
             }
             

        }catch(e){
             console.error(e);

             return{
                success:false,
                message:"Failed to delete user"
             }
        }

      }

    


}