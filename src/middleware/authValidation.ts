import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { errorResponse } from '../utils/response';

interface DecodedUser {
    user: {
      id: string;
    }
  }

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json(errorResponse('Not authorized'));

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedUser;
        const userObj = await User.findById(decoded.user.id).select('-password');
        if (!userObj) {
            return res.status(401).json({ message: 'User not available' });
        }
        
        req.user = {
            id: userObj._id.toString(),
            email: userObj.email
        };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
