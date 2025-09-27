import jwt from 'jsonwebtoken';

export interface UserJWTPayload {
  userId: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined in environment variables.');
    throw new Error('Internal server configuration error: JWT_SECRET is missing.');
  }
  return secret;
};

export const signToken = (payload: UserJWTPayload): string => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '1d' });
};

export const verifyToken = (token: string): UserJWTPayload | null => {
  try {
    const decoded = jwt.verify(token, getJwtSecret());

    if (typeof decoded === 'object' && 'userId' in decoded) {
      return decoded as UserJWTPayload;
    }

    return null;
  } catch (error) {
    return null; 
  }
};