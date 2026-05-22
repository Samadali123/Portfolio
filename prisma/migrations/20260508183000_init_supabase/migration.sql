-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "contacts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullName" VARCHAR(120) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "phone" VARCHAR(40) NOT NULL DEFAULT '',
    "companyName" VARCHAR(160) NOT NULL DEFAULT '',
    "message" VARCHAR(3000) NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',
    "source" VARCHAR(120) NOT NULL DEFAULT 'website-contact-form',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullName" VARCHAR(120) NOT NULL DEFAULT '',
    "email" VARCHAR(180) NOT NULL,
    "phone" VARCHAR(40) NOT NULL DEFAULT '',
    "serviceInterestedIn" VARCHAR(120) NOT NULL,
    "preferredDate" VARCHAR(80) NOT NULL,
    "preferredTime" VARCHAR(40) NOT NULL,
    "projectDescription" VARCHAR(3000) NOT NULL DEFAULT '',
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',
    "source" VARCHAR(120) NOT NULL DEFAULT 'website-consultation-form',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullName" VARCHAR(120) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "college" VARCHAR(180) NOT NULL,
    "graduationYear" VARCHAR(20) NOT NULL,
    "role" VARCHAR(120) NOT NULL,
    "experience" VARCHAR(80) NOT NULL,
    "portfolio" VARCHAR(500) NOT NULL DEFAULT '',
    "github" VARCHAR(500) NOT NULL DEFAULT '',
    "resumeFileName" VARCHAR(220) NOT NULL,
    "resumeMimeType" VARCHAR(80) NOT NULL,
    "resumeSize" INTEGER NOT NULL,
    "resumeData" BYTEA NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',
    "source" VARCHAR(120) NOT NULL DEFAULT 'website-talent-pool-form',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullName" VARCHAR(120) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" VARCHAR(40) NOT NULL DEFAULT 'admin',
    "resetPasswordTokenHash" TEXT NOT NULL DEFAULT '',
    "resetPasswordExpiresAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contacts_createdAt_idx" ON "contacts"("createdAt");

-- CreateIndex
CREATE INDEX "consultations_createdAt_idx" ON "consultations"("createdAt");

-- CreateIndex
CREATE INDEX "consultations_serviceInterestedIn_idx" ON "consultations"("serviceInterestedIn");

-- CreateIndex
CREATE INDEX "applications_createdAt_idx" ON "applications"("createdAt");

-- CreateIndex
CREATE INDEX "applications_role_idx" ON "applications"("role");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
