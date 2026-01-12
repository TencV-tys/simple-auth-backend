import express from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes";
import adminRoutes from './routes/admin.routes';
import cookieParser from "cookie-parser";
import cors from 'cors';
dotenv.config();

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(cors({
    origin:true,
    credentials:true
}));

server.use("/api/auth", authRoutes);
server.use("/api/admin",adminRoutes);
const PORT = process.env.PORT || 3001;

server.listen(PORT,()=>{
    console.log(`Server running at localhost:${PORT}`);
})