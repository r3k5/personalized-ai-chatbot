import { PrismaClient, type Review } from '../generated/prisma';
import dayjs from 'dayjs';

console.log('Prisma DATABASE_URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

export const reviewRepository = {
   async getReviews(productId: number, limit?: number): Promise<Review[]> {
      // SELECT * FROM reviews WHERE productId = @productId ORDER BY createdAt DESC
      return prisma.review.findMany({
         where: { productId: productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   },

   // Store or update the review summary for a product
   storeReviewSummary(productId: number, summary: string) {
      const now = new Date();
      const expiresAt = dayjs().add(7, 'days').toDate();
      const data = {
         productId,
         content: summary,
         expiresAt,
         generatedAt: now,
      };

      // Upsert the summary (create if not exists, otherwise update)
      return prisma.summary.upsert({
         where: { productId },
         create: data,
         update: data,
      });
   },

   async getReviewSummary(productId: number): Promise<string | null> {
      const summary = await prisma.summary.findFirst({
         where: {
            AND: [
               { productId },
               { expiresAt: { gt: new Date() } }, // Ensure the summary is not expired}
            ],
         },
      });

      return summary ? summary.content : null;
   },
};
