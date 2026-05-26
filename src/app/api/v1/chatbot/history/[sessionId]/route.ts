import { handleApiError } from '@/server/api';
import { chatbotService } from '@/server/chatbot.js';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  try {
    const { sessionId } = await params;
    return await chatbotService.getChatHistory(sessionId);
  } catch (error) {
    return handleApiError(error);
  }
}
