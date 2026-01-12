import {Router} from 'express';

import { AdminController } from '../controllers/admin.controller';

import authMiddleware from '../middlewares/auth.middleware';

import { requireRole } from '../middlewares/auth.role';

const router = Router();


router.use(authMiddleware,requireRole('ADMIN'));
router.use('/users',AdminController.getAllUsers);
router.use('/users/:userId',AdminController.getDeleteUser);


export default router;