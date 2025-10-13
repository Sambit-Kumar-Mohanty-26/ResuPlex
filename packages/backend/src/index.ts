import app from './app.js';
import { prisma } from './db/index.js';

const port = parseInt(process.env.PORT || '8001', 10);
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

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