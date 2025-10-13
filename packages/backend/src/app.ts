import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import resumeRoutes from './routes/resume.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app: Express = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://resu-plex.vercel.app'
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);

export default app;