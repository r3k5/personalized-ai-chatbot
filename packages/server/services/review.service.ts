import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import template from '../prompts/summarize-reviews.txt';

// Export the public inferface of the module
export const reviewService = {
   async summarizeReviews(productId: number): Promise<string> {
      // Check if we have a cached summary that is still valid
      const existingSummary =
         await reviewRepository.getReviewSummary(productId);
      if (existingSummary) {
         return existingSummary;
      }

      // Get the last 10 reviews for the product
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      // Inject the reviews into the prompt template
      const prompt = template.replace('{{reviews}}', joinedReviews);

      // Send the reviews to a LLM to generate a summary
      const { text: summary } = await llmClient.generateText({
         model: 'gpt-4o-mini',
         prompt,
         temperature: 0.2,
         maxTokens: 500,
      });

      // Store the summary in the database with a 7-day expiration
      await reviewRepository.storeReviewSummary(productId, summary);

      return summary;
   },
};
