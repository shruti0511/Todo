import { Request, Response } from 'express';
import { UserBody } from '../schema/user.schema';
import User from '../models/user.model';
import { errorResponse, successResponse } from '../utils/response';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface LoginResponse {
  user: {
    id: string;
    email: string;
  },
  token: string
}

export const registerUser = async (req: Request<any, any, UserBody>, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).exec()
  if (user) {
    return res.status(404)
      .json(errorResponse("User already exist. please login."))
  }
  const newUser = new User({
    email: email,
    password: password
  })
  await newUser.save()

  return res.status(200)
    .json(successResponse("User Registered Successfully", newUser.email))
};

export const loginUser = async (req: Request<any, any, UserBody>, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).exec()
  if (!user) {
    return res.status(404)
      .json(errorResponse("User not exist.please register."))
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password || '');
  if (!isPasswordValid) {
    return res.status(401)
      .json(errorResponse("Invalid credentials"));
  }

  const accessToken = jwt.sign(
    {
      user: {
        id: user.id
      }
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1 * 60 * 60 * 100
  });

  // Successful login
  return res.status(200)
    .json(successResponse<LoginResponse>("Login Successful", {
      user: {
        id: user._id?.toString() || '',
        email: user.email
      },
      token: accessToken
    }));
};