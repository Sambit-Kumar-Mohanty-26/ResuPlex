// packages/backend/src/index.ts

import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express'; // <-- Import NextFunction
import cors from 'cors'; // We still need this for some things, but will override
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// =================================================================
// BULLETPROOF CUSTOM CORS MIDDLEWARE
// =================================================================
const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Intercept OPTIONS method (the preflight request)
  if ('OPTIONS' == req.method) {
    res.sendStatus(204);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
// =================================================================

// We can remove the complex cors() call now, but let's keep express.json()
app.use(express.json());


// --- API ROUTES ---
// The rest of your file is unchanged.
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'ResuPlex API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});