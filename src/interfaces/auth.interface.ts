export interface SignupData{
 name:string;
 email:string;
 password:string;
}

export interface LoginData{
    email:string;
    password:string;
}

export interface AuthResponse{
    success:boolean;
    message:string;
    token?:string;
    user?:{
        id:number;
        name:string;
        email:string;
        role:string;
    };
}

export interface TokenPayload{
    userId:number;
    role:string;
}