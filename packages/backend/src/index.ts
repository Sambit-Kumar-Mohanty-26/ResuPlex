import express from 'express'; 
import type { Express, Request, Response } from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './db/index.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors()); 
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", message: "ResuPlex API is running!" });
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Failed to create user:", error);
    // Handle specific Prisma error for unique constraints
    // @ts-ignore
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A user with this email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});