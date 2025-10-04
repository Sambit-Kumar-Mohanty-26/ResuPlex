import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// =================================================================
// Add a global error handler to catch hidden promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('<<<<< UNHANDLED REJECTION >>>>>');
  console.error('Reason:', reason);
  console.error('Promise:', promise);
  console.error('<<<<< END UNHANDLED REJECTION >>>>>');
  // Optionally exit the process, but for debugging, just logging is fine.
  // process.exit(1);
});
// =================================================================

// In ESM, __dirname is not available directly. This code derives it.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the absolute path to the .env file in the package root
const envPath = path.resolve(__dirname, '..', '.env');

console.log(`[Dev Bootstrap] Attempting to load .env from: ${envPath}`);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('[Dev Bootstrap] FATAL: Error loading .env file:', result.error);
  process.exit(1); // Exit if the .env file can't be read
}

if (!result.parsed || Object.keys(result.parsed).length === 0) {
    console.warn('[Dev Bootstrap] WARNING: .env file was found but is empty or could not be parsed.');
} else {
    console.log('[Dev Bootstrap] .env file loaded successfully.');
}

// Let's add a definitive log to prove the variable is loaded
console.log(`[Dev Bootstrap] DATABASE_URL is: ${process.env.DATABASE_URL ? 'SET' : 'NOT SET'}`);

// Now that the environment is configured, import and run the main server.
import './index.js';