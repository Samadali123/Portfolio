import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';
import { buildChatbotService } from './chatbot.js';

describe('chatbot controller', () => {
  it('rejects empty chat messages', async () => {
    const service = buildChatbotService({
      prisma: {},
      getAnswer: mock.fn(),
    });

    await assert.rejects(
      () => service.createChatResponse({ message: '   ' }),
      /Message cannot be empty/
    );
  });

  it('passes recent history to RAG and stores the bot answer', async () => {
    const getAnswer = mock.fn(async () => 'ASG Solutions can help with cloud architecture.');
    const prisma = {
      chatHistory: {
        findMany: mock.fn(async () => [
          { userMessage: 'Hi', botResponse: 'Hello' },
          { userMessage: 'Services?', botResponse: 'Cloud and AI' },
        ]),
        create: mock.fn(async () => ({ id: 1n })),
      },
    };
    const service = buildChatbotService({ prisma, getAnswer });

    const response = await service.createChatResponse({ session_id: 'abc', message: 'Tell me about cloud' });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.data.answer, 'ASG Solutions can help with cloud architecture.');
    assert.equal(getAnswer.mock.calls[0].arguments[0].question, 'Tell me about cloud');
    assert.match(getAnswer.mock.calls[0].arguments[0].history, /User: Services\?/);
    assert.equal(prisma.chatHistory.create.mock.callCount(), 1);
  });
});
