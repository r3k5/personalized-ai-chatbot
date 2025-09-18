import fs from 'fs';
import path from 'path';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';
import { llmClient } from '../llm/client';

// Read the MD file in the prompts directory and inject it into the template as model instructions
const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = template.replace('{{PARK_INFO}}', parkInfo);

type ChatResponse = {
   id: string;
   output_text: string;
};

// Export the public inferface of the module
// Leaky abstraction - exposing OpenAI response object
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationID: string
   ): Promise<ChatResponse> {
      const response = await llmClient.generateText({
         model: 'gpt-4o-mini',
         instructions,
         prompt,
         temperature: 0.2,
         maxTokens: 200,
         previousResponseId:
            conversationRepository.getLastResponseID(conversationID),
      });

      conversationRepository.setLastResponseID(conversationID, response.id);

      return {
         id: response.id,
         output_text: response.text,
      };
   },
};
