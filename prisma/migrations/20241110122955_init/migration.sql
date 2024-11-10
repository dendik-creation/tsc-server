-- CreateEnum
CREATE TYPE "StaffGuruCategory" AS ENUM ('GURU', 'TENDIK');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERUSER', 'PENGAWAS', 'MADRASAH');

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER,
    "receiver_id" INTEGER,
    "message_text" TEXT NOT NULL,
    "chatFileId" INTEGER,
    "is_seen" BOOLEAN NOT NULL DEFAULT false,
    "replyTo" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatFile" (
    "id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatRequest" (
    "id" SERIAL NOT NULL,
    "requesterId" INTEGER,
    "receiverId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "accepted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentReference" (
    "id" SERIAL NOT NULL,
    "document_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentKebijakan" (
    "id" SERIAL NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentKebijakan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KepalaMadrasah" (
    "id" SERIAL NOT NULL,
    "madrasahId" INTEGER,
    "nip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "born_place" TEXT NOT NULL,
    "born_date" TIMESTAMP(3) NOT NULL,
    "education" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "nuptk" TEXT NOT NULL,
    "tmt" TIMESTAMP(3) NOT NULL,
    "home_address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KepalaMadrasah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Madrasah" (
    "id" SERIAL NOT NULL,
    "pengawas_id" INTEGER,
    "madrasah_operator_id" INTEGER,
    "npsn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "madrasah_status" TEXT,
    "address" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "province" TEXT,
    "city" TEXT,
    "district" TEXT,
    "village" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Madrasah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccreditationMadrasah" (
    "id" SERIAL NOT NULL,
    "madrasah_id" INTEGER,
    "accreditation_status" TEXT,
    "accreditation_year" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccreditationMadrasah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MadrasahDocument" (
    "id" SERIAL NOT NULL,
    "madrasahId" INTEGER,
    "document_url" TEXT NOT NULL,
    "documentReferenceId" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MadrasahDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffGuru" (
    "id" SERIAL NOT NULL,
    "madrasahId" INTEGER,
    "nip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "category" "StaffGuruCategory" NOT NULL,
    "born_place" TEXT NOT NULL,
    "born_date" TIMESTAMP(3) NOT NULL,
    "tmt" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "work_status" TEXT NOT NULL,
    "is_pns" BOOLEAN DEFAULT false,
    "is_certified" BOOLEAN NOT NULL DEFAULT false,
    "education" TEXT,
    "year_added" TEXT NOT NULL,
    "exit_reason" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StaffGuru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentCount" (
    "id" SERIAL NOT NULL,
    "madrasahId" INTEGER,
    "grade" TEXT NOT NULL,
    "rombel" INTEGER NOT NULL,
    "male" INTEGER NOT NULL,
    "female" INTEGER NOT NULL,
    "total_student" INTEGER NOT NULL,
    "year_added" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "full_name" TEXT,
    "pangkat" TEXT,
    "jabatan" TEXT,
    "role" "UserRole" NOT NULL,
    "first_password" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chatFileId_key" ON "Chat"("chatFileId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatRequest_requesterId_key" ON "ChatRequest"("requesterId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatRequest_receiverId_key" ON "ChatRequest"("receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "KepalaMadrasah_madrasahId_key" ON "KepalaMadrasah"("madrasahId");

-- CreateIndex
CREATE UNIQUE INDEX "KepalaMadrasah_nip_key" ON "KepalaMadrasah"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Madrasah_madrasah_operator_id_key" ON "Madrasah"("madrasah_operator_id");

-- CreateIndex
CREATE UNIQUE INDEX "Madrasah_npsn_key" ON "Madrasah"("npsn");

-- CreateIndex
CREATE UNIQUE INDEX "Madrasah_email_key" ON "Madrasah"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StaffGuru_nip_key" ON "StaffGuru"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_chatFileId_fkey" FOREIGN KEY ("chatFileId") REFERENCES "ChatFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_replyTo_fkey" FOREIGN KEY ("replyTo") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRequest" ADD CONSTRAINT "ChatRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRequest" ADD CONSTRAINT "ChatRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KepalaMadrasah" ADD CONSTRAINT "KepalaMadrasah_madrasahId_fkey" FOREIGN KEY ("madrasahId") REFERENCES "Madrasah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Madrasah" ADD CONSTRAINT "Madrasah_pengawas_id_fkey" FOREIGN KEY ("pengawas_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Madrasah" ADD CONSTRAINT "Madrasah_madrasah_operator_id_fkey" FOREIGN KEY ("madrasah_operator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccreditationMadrasah" ADD CONSTRAINT "AccreditationMadrasah_madrasah_id_fkey" FOREIGN KEY ("madrasah_id") REFERENCES "Madrasah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MadrasahDocument" ADD CONSTRAINT "MadrasahDocument_madrasahId_fkey" FOREIGN KEY ("madrasahId") REFERENCES "Madrasah"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MadrasahDocument" ADD CONSTRAINT "MadrasahDocument_documentReferenceId_fkey" FOREIGN KEY ("documentReferenceId") REFERENCES "DocumentReference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffGuru" ADD CONSTRAINT "StaffGuru_madrasahId_fkey" FOREIGN KEY ("madrasahId") REFERENCES "Madrasah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCount" ADD CONSTRAINT "StudentCount_madrasahId_fkey" FOREIGN KEY ("madrasahId") REFERENCES "Madrasah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
