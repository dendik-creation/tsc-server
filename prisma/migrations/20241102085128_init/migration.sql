-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_id` INTEGER NULL,
    `receiver_id` INTEGER NULL,
    `message_text` VARCHAR(191) NOT NULL,
    `chatFileId` INTEGER NULL,
    `is_seen` BOOLEAN NOT NULL DEFAULT false,
    `replyTo` INTEGER NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Chat_chatFileId_key`(`chatFileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChatFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(191) NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChatRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requesterId` INTEGER NULL,
    `receiverId` INTEGER NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `accepted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ChatRequest_requesterId_key`(`requesterId`),
    UNIQUE INDEX `ChatRequest_receiverId_key`(`receiverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentReference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `document_name` VARCHAR(191) NOT NULL,
    `allowed_file_type` JSON NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KepalaMadrasah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `madrasahId` INTEGER NULL,
    `nip` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `born_place` VARCHAR(191) NOT NULL,
    `born_date` DATETIME(3) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `major` VARCHAR(191) NOT NULL,
    `nuptk` VARCHAR(191) NOT NULL,
    `tmt` DATETIME(3) NOT NULL,
    `home_address` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `KepalaMadrasah_madrasahId_key`(`madrasahId`),
    UNIQUE INDEX `KepalaMadrasah_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Madrasah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pengawas_id` INTEGER NULL,
    `madrasah_operator_id` INTEGER NULL,
    `npsn` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `madrasah_status` VARCHAR(191) NULL,
    `accreditation_status` VARCHAR(191) NULL,
    `accreditation_year` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `village` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Madrasah_madrasah_operator_id_key`(`madrasah_operator_id`),
    UNIQUE INDEX `Madrasah_npsn_key`(`npsn`),
    UNIQUE INDEX `Madrasah_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MadrasahDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `madrasahId` INTEGER NULL,
    `document_url` VARCHAR(191) NOT NULL,
    `documentReferenceId` INTEGER NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffGuru` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `madrasahId` INTEGER NULL,
    `nip` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `category` ENUM('GURU', 'TENDIK') NOT NULL,
    `born_place` VARCHAR(191) NOT NULL,
    `born_date` DATETIME(3) NOT NULL,
    `tmt` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `work_status` VARCHAR(191) NOT NULL,
    `is_pns` BOOLEAN NULL DEFAULT false,
    `is_certified` BOOLEAN NOT NULL DEFAULT false,
    `education` VARCHAR(191) NULL,
    `year_added` VARCHAR(191) NOT NULL,
    `exit_reason` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `StaffGuru_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentCount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `madrasahId` INTEGER NULL,
    `grade` VARCHAR(191) NOT NULL,
    `rombel` INTEGER NOT NULL,
    `male` INTEGER NOT NULL,
    `female` INTEGER NOT NULL,
    `total_student` INTEGER NOT NULL,
    `year_added` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NULL,
    `pangkat` VARCHAR(191) NULL,
    `jabatan` VARCHAR(191) NULL,
    `role` ENUM('SUPERUSER', 'PENGAWAS', 'MADRASAH') NOT NULL,
    `first_password` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_chatFileId_fkey` FOREIGN KEY (`chatFileId`) REFERENCES `ChatFile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_replyTo_fkey` FOREIGN KEY (`replyTo`) REFERENCES `Chat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRequest` ADD CONSTRAINT `ChatRequest_requesterId_fkey` FOREIGN KEY (`requesterId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRequest` ADD CONSTRAINT `ChatRequest_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KepalaMadrasah` ADD CONSTRAINT `KepalaMadrasah_madrasahId_fkey` FOREIGN KEY (`madrasahId`) REFERENCES `Madrasah`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Madrasah` ADD CONSTRAINT `Madrasah_pengawas_id_fkey` FOREIGN KEY (`pengawas_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Madrasah` ADD CONSTRAINT `Madrasah_madrasah_operator_id_fkey` FOREIGN KEY (`madrasah_operator_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MadrasahDocument` ADD CONSTRAINT `MadrasahDocument_madrasahId_fkey` FOREIGN KEY (`madrasahId`) REFERENCES `Madrasah`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MadrasahDocument` ADD CONSTRAINT `MadrasahDocument_documentReferenceId_fkey` FOREIGN KEY (`documentReferenceId`) REFERENCES `DocumentReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffGuru` ADD CONSTRAINT `StaffGuru_madrasahId_fkey` FOREIGN KEY (`madrasahId`) REFERENCES `Madrasah`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentCount` ADD CONSTRAINT `StudentCount_madrasahId_fkey` FOREIGN KEY (`madrasahId`) REFERENCES `Madrasah`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
