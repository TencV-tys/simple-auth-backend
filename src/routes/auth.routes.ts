import {Router} from "express";

import AuthController from "../controllers/auth.controller";

import authMiddleware from "../middlewares/auth.middleware";

import { requireRole } from "../middlewares/auth.role";

const router = Router();


router.post("/signup", AuthController.signup);
router.post("/login",AuthController.login);

router.get("/profile", authMiddleware, (req,res)=>{
    res.json({message:"Protected routes"});
});
router.get('/admin', authMiddleware,requireRole("ADMIN"),(req,res)=>{
    res.json({message:"Admin access granted"});
})

router.post('/logout',AuthController.logout);

export default router;
