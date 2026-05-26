const buildHistoryText = (rows) =>
  rows
    .slice()
    .reverse()
    .map((row) => `User: ${row.userMessage}\nBot: ${row.botResponse}\n`)
    .join('\n');

class ChatbotServiceError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

const successResponse = (message, data = {}, statusCode = 200) =>
  Response.json({ success: true, message, data }, { status: statusCode });

const resolvePrisma = async (prisma) => prisma || (await import('./db')).prisma;
const resolveGetAnswer = async (getAnswer) => getAnswer || (await import('./rag')).getAnswer;

export const buildChatbotService = ({ prisma, getAnswer } = {}) => ({
  createChatResponse: async (body) => {
    const message = body?.message?.toString().trim();

    if (!message) {
      throw new ChatbotServiceError('Message cannot be empty', 400);
    }

    const activePrisma = await resolvePrisma(prisma);
    const activeGetAnswer = await resolveGetAnswer(getAnswer);
    const sessionId = String(body?.session_id || body?.sessionId || 'default');
    const rows = await activePrisma.chatHistory.findMany({
      where: { sessionId },
      select: { userMessage: true, botResponse: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const answer = await activeGetAnswer({
      question: message,
      history: buildHistoryText(rows),
    });

    await activePrisma.chatHistory.create({
      data: {
        sessionId,
        userMessage: message,
        botResponse: answer,
      },
    });

    return successResponse('Chatbot response generated', { answer });
  },

  getChatHistory: async (sessionId) => {
    const activePrisma = await resolvePrisma(prisma);
    const rows = await activePrisma.chatHistory.findMany({
      where: { sessionId },
      select: { userMessage: true, botResponse: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    return successResponse('Chat history fetched successfully', { history: rows });
  },
});

export const chatbotService = buildChatbotService();
