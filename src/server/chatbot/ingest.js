import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, 'data');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const getGenAI = () => {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY is required for chatbot ingestion');
  }

  return new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
};

export const readTextFiles = (dir = dataPath) =>
  fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.txt'))
    .map((file) => ({
      filename: file,
      content: fs.readFileSync(path.join(dir, file), 'utf8'),
    }));

export const chunkText = (text, chunkSize = 700, overlap = 100) => {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    chunks.push(text.slice(start, Math.min(start + chunkSize, text.length)));
    start += chunkSize - overlap;
  }

  return chunks;
};

export const embedTexts = async (texts) => {
  const model = getGenAI().getGenerativeModel({
    model: process.env.GEMINI_EMBEDDING_MODEL || 'embedding-001',
  });

  return Promise.all(
    texts.map(async (text) => {
      const result = await model.embedContent(text);
      return result.embedding.values;
    })
  );
};

export const createVectorDB = async () => {
  await prisma.vector.deleteMany({});

  const chunks = readTextFiles().flatMap((doc) =>
    chunkText(doc.content).map((content) => ({ docId: doc.filename, content }))
  );
  const embeddings = await embedTexts(chunks.map((chunk) => chunk.content));

  for (let index = 0; index < chunks.length; index += 100) {
    const batch = chunks.slice(index, index + 100).map((chunk, batchIndex) => ({
      docId: chunk.docId,
      content: chunk.content,
      embedding: embeddings[index + batchIndex],
      metadata: { source: chunk.docId },
    }));

    await prisma.vector.createMany({ data: batch });
  }

  return chunks.length;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createVectorDB()
    .then(async (count) => {
      console.log(`Vector DB created successfully with ${count} chunks`);
      await prisma.$disconnect();
    })
    .catch(async (error) => {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    });
}
