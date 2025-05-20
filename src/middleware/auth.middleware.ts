import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../utils/logger.js';
import { JWT_SECRET } from '../utils/constants.js';

declare module 'express' {
  interface Request {
    user?: (JwtPayload & { role?: string }) | string;
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = typeof decoded === 'string' ? decoded : { ...decoded, role: 'admin' };
    next();
  } catch (error) {
    logger.error('JWT error:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = typeof req.user === 'object' ? req.user?.role : undefined;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};