import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
   // Retrieve reviews for a specific product
   // GET /api/products/:id/reviews
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      // Validate productId is a number otherwise return 400 Bad Request
      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }

      const product = await productRepository.getProduct(productId);
      if (!product) {
         return res.status(400).json({ error: 'Invalid product' });
      }

      const reviews = await reviewRepository.getReviews(productId);
      const summary = await reviewRepository.getReviewSummary(productId);

      res.json({
         reviews,
         summary,
      });
   },

   // Summarize reviews for a specific product
   // POST /api/products/:id/reviews/summarize
   async summarizeReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      // Validate productId is a number otherwise return 400 Bad Request
      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }
      const product = await productRepository.getProduct(productId);
      if (!product) {
         return res.status(400).json({ error: 'Invalid product' });
      }

      const reviews = await reviewRepository.getReviews(productId, 1);
      if (!reviews.length) {
         return res
            .status(400)
            .json({ error: 'There are no reviews to summarize.' });
      }

      const summary = await reviewService.summarizeReviews(productId);

      res.json({ summary });
   },
};
