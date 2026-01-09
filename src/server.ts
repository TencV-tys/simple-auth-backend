import express from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
dotenv.config();

const server = express();
server.use(express.json());
server.use(cookieParser());

server.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;

server.listen(PORT,()=>{
    console.log(`Server running at localhost:${PORT}`);
})