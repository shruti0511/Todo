import { Router } from 'express';
import userRoute from './user.route';
import todoRoute from './todo.route';

const router = Router();

router.use('/auth', userRoute);
router.use('/todos', todoRoute);

export default router; 