import prisma from "../prisma";

export class AdminServices{

      static async getAllUser(page:number = 1, limit:number = 10 ){
           
        try{

                 const skip = (page - 1) * limit;
                
                 const totalUsers = await prisma.user.count()

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
                },
                skip:skip,
                take:limit
               });
               
                  const totalPages = Math.ceil(totalUsers/limit);

               return{
                success:true,
                message:"User fetched successfully",
                user:users,
                pagination:{
                  currentPage:page,
                  totalPages: totalPages,
                  totalUsers: totalUsers,
                  hasNextPage: page < totalPages,
                  hasPrevPage: page > 1

                }
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