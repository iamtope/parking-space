import { Router } from 'express';
import userRoutes from './users';
import adminRoutes from './admins'

const router = Router();

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

export default router;
