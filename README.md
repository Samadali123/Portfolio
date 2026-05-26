# Nexora Solutions - Full-Stack Next.js Website

A responsive IT services website for ASG/Nexora Solutions built as one full-stack Next.js app. The same server renders the website and handles `/api/v1/*` routes for forms, admin dashboard data, resume downloads, email notifications, and the RAG chatbot.

## Features

- Public pages: Home, Services, About, Portfolio, Careers, Contact, Privacy Policy, and Terms of Service.
- Admin pages: login, registration, password reset, and dashboard.
- API routes: contact, consultation, applications, admin auth/dashboard, chatbot, and health checks.
- Chatbot: Gemini-powered RAG assistant with persisted chat history.
- Data layer: Prisma with PostgreSQL.
- Styling: Tailwind CSS, Framer Motion, Recharts, and Lucide icons.

## Scripts

```bash
npm install
npm run dev
npm run build
npm start
npm test
npm run chatbot:ingest
```

## Environment

Required server-side variables:

- `DATABASE_URL`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USER`
- `MAIL_PASS`
- `COMPANY_EMAIL`
- `JWT_SECRET`
- `GOOGLE_API_KEY`
- `GEMINI_MODEL`
- `GEMINI_EMBEDDING_MODEL`

`DIRECT_URL` may remain for Prisma/database tooling if needed. No separate frontend/backend origin variable is needed because the app is served from one Next.js origin.
