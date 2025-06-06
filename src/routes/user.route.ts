import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';
import { validate } from '../middleware/validationMiddleware';
import { userSchema } from '../schema/user.schema';

const router = express.Router();

router.post('/register', validate(userSchema), registerUser);
router.post('/login', validate(userSchema), loginUser);

export default router;
