import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

// Load environment variables from .env file
dotenv.config();
if (!process.env) {
   throw new Error('.env file is missing');
} else if (!process.env.OPENAI_API_KEY) {
   throw new Error('OPENAI_API_KEY is missing');
}

// Create Express App
const app = express();

// Use JSON Middleware to parse JSON Requests
// Use the imported router for handling routes
app.use(express.json());
app.use(router);

// Define Server Port that app will use to listen for incoming Requests
const PORT = process.env.PORT || 3000;

// Start the server and listen on the defined PORT
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
