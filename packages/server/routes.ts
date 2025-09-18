import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { reviewController } from './controllers/review.controller';

// Create Express Router
const router = express.Router();

// Define GET Route and Route Handler
router.get('/', (req: Request, res: Response) => {
   res.send('Hello from the R3k5 Development Server!');
});

// Define POST Chat Route and Handler
router.post('/api/chat', chatController.sendMessage);

// Define GET Product Route and Handler
router.get('/api/products/:id/reviews', reviewController.getReviews);

// Define POST Product Review Summary Route and Handler
router.post(
   '/api/products/:id/reviews/summarize',
   reviewController.summarizeReviews
);

// Export the router to be used in the main server file
export default router;
