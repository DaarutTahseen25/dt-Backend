//import AppError from "../utils/AppError";
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

export const authMiddleware = (req, _, next) => {

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.userId;

    next();
  } catch (error) {
    next(error);
  }
};
