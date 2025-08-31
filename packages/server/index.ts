import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Create Express App
const app = express();

// Define Server Port that app will use to listen for incoming Requests
const PORT = process.env.PORT || 3000;

// Define Route and Route Handler
app.get('/', (req: Request, res: Response) => {
   res.send('Hello from the R3k5 Development Server!');
   //res.send(process.env.OPENAI_API_KEY);
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the R3k5 Development Server!' });

   //res.send(process.env.OPENAI_API_KEY);
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
