import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants.js';
import logger from '../utils/logger.js';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Hardcoded data for the challenge (in production use bcrypt and DB)
      const { username, password } = req.body;
      
      if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
      }
      
      return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
      logger.error('Login error:', error);
      next(error);
    }
  }
}

export default new AuthController();