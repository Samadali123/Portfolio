import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from './db';
import { env } from './env';

const cosine = (a: number[], b: number[]) => {
  const dot = a.reduce((sum, val, index) => sum + val * b[index], 0);
  const normA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const normB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));

  if (!normA || !normB) {
    return -1;
  }

  return dot / (normA * normB);
};

const getGenAI = () => {
  if (!env.googleApiKey) {
    throw new Error('GOOGLE_API_KEY is required for chatbot responses');
  }

  return new GoogleGenerativeAI(env.googleApiKey);
};

export const embedTexts = async (texts: string[]) => {
  const model = getGenAI().getGenerativeModel({
    model: env.googleEmbeddingModel,
  });
  const embeddings = await Promise.all(
    texts.map(async (text) => {
      const result = await model.embedContent(text);
      return result.embedding.values;
    })
  );

  return embeddings;
};

export const retrieveRelevant = async (question: string, k = 4) => {
  const [qEmbedding] = await embedTexts([question]);
  const rows = await prisma.vector.findMany();

  return rows
    .map((row) => ({
      ...row,
      score: row.embedding ? cosine(qEmbedding, row.embedding) : -1,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((row) => ({ content: row.content, metadata: row.metadata }));
};

export const getAnswer = async ({ question, history = '' }: { question: string; history?: string }) => {
  const docs = await retrieveRelevant(question, 4);
  const context = docs.map((doc) => doc.content).join('\n\n');
  const model = getGenAI().getGenerativeModel({ model: env.googleChatModel });

  const systemPrompt = `You are the highly professional, helpful, and sophisticated IT Services Consultant chatbot for ASG Solutions.\n\nAnswer only using the provided Company Context. Do not hallucinate.\nKeep your responses very concise and to the point. Do not provide detailed explanations unless the user explicitly asks for them.\nDo not use Markdown formatting (like **asterisks**) or HTML tags (like <b>). If you need to emphasize text, use Unicode bold text characters.`;

  const userPrompt = `Company Context:
${context}

Previous Chat History:
${history}

User Question:
${question}`;

  const result = await model.generateContent([systemPrompt, userPrompt]);
  return (
    result.response?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim() || ''
  );
};
