import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/index.js';
import { verifyToken } from '../utils/jwt.js'; 

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string | null;
  };
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }
  const decodedPayload = verifyToken(token);

  if (!decodedPayload) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decodedPayload.userId },
      select: { id: true, email: true, name: true }, 
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found.' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Auth middleware DB error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default authMiddleware;