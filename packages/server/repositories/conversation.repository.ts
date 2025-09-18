//Implementation Detail
// In-memory store for conversations
const conversations = new Map<string, string>();

// Export the public inferface of the module
export const conversationRepository = {
   getLastResponseID(conversationID: string): string | undefined {
      return conversations.get(conversationID);
   },

   setLastResponseID(conversationID: string, responseID: string): void {
      conversations.set(conversationID, responseID);
   },
};
