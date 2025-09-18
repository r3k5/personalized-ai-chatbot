import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

// Implementation Detail
// Define Zod Schema for Request Validation
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long (max 1,000 characters).'),
   conversationID: z.string().uuid(),
});

// Export the public inferface of the module
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         return res.status(400).json(parseResult.error.format());
      }

      try {
         const { prompt, conversationID } = req.body; // Need JSON Middleware instaled to parse this JSON body
         const response = await chatService.sendMessage(prompt, conversationID);

         res.json({ message: response.output_text });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate a response.' });
      }
   },
};
