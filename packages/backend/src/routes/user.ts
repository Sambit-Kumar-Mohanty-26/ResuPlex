// packages/backend/src/routes/user.ts

import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import type { AuthRequest } from '../middleware/authMiddleware.js'; // Import our custom request type

const router = Router();

// =================================================================
// GET /api/users/me
// This is a protected route.
// =================================================================
router.get('/me', authMiddleware, (req: AuthRequest, res) => {
  // If the code reaches this point, the authMiddleware has successfully
  // verified the token and attached the user object to the request.
  
  // We can confidently send back the req.user object.
  res.status(200).json(req.user);
});

export default router;