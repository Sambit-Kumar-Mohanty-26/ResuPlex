import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Pool } from 'pg';
import { prisma } from './db/index.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import resumeRoutes from './routes/resume.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || '8001', 10);

console.log("===================================");
console.log("SERVER STARTING UP...");
console.log("DATABASE_URL Value Check:");
if (process.env.DATABASE_URL) {
    const urlParts = process.env.DATABASE_URL.split('@');
    console.log(`URL seems to be set. Host: @${urlParts[1]}`);
} else {
    console.error("CRITICAL FAILURE: process.env.DATABASE_URL IS NOT SET!");
}
console.log("===================================");

const allowedOrigins = [
  'http://localhost:5173',
  'https://resu-plex.vercel.app'
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`CORS ERROR: Origin ${origin} not allowed.`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'ResuPlex API is running!' });
});

app.get('/api/db-test', async (req: Request, res: Response) => {
  console.log('Received request for /api/db-test');
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    return res.status(500).json({ error: 'DATABASE_URL environment variable is not set on the server.' });
  }

  const pool = new Pool({ connectionString });
  let client;

  try {
    console.log('Attempting direct connection to database...');
    client = await pool.connect();
    console.log('SUCCESS: Direct connection to database established!');
    await client.query('SELECT NOW()'); 
    console.log('SUCCESS: Test query executed.');
    res.status(200).json({ message: 'Database connection test was successful.' });
  } catch (error) {
    console.error('FAIL: Database connection test failed.', error);
    res.status(500).json({
      error: 'Failed to connect to the database directly.',
      details: (error as Error).message,
    });
  } finally {
    if (client) client.release();
    await pool.end();
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);
const host = '0.0.0.0';

const server = app.listen(port, host, () => {
  console.log(`[server]: Server is running at http://${host}:${port}`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`[server]: Received ${signal}, shutting down gracefully.`);
  server.close(async () => {
    console.log('[server]: Closed out remaining connections.');
    await prisma.$disconnect();
    console.log('[prisma]: Disconnected from database.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));