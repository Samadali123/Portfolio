CREATE TABLE "chat_history" (
    "id" BIGSERIAL NOT NULL,
    "session_id" TEXT NOT NULL,
    "user_message" TEXT NOT NULL,
    "bot_response" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_history_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "vectors" (
    "id" BIGSERIAL NOT NULL,
    "doc_id" TEXT,
    "content" TEXT NOT NULL,
    "embedding" DOUBLE PRECISION[],
    "metadata" JSONB,

    CONSTRAINT "vectors_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "chat_history_session_id_idx" ON "chat_history"("session_id");
CREATE INDEX "chat_history_created_at_idx" ON "chat_history"("created_at");
