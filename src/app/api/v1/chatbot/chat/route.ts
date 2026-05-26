import { handleApiError, readJson } from '@/server/api';
import { chatbotService } from '@/server/chatbot.js';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    return await chatbotService.createChatResponse(body);
  } catch (error) {
    return handleApiError(error);
  }
}
