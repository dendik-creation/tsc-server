/*
  Warnings:

  - You are about to drop the column `accreditation_status` on the `madrasah` table. All the data in the column will be lost.
  - You are about to drop the column `accreditation_year` on the `madrasah` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `madrasah` DROP COLUMN `accreditation_status`,
    DROP COLUMN `accreditation_year`;

-- CreateTable
CREATE TABLE `AccreditationMadrasah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `madrasah_id` INTEGER NULL,
    `accreditation_status` VARCHAR(191) NULL,
    `accreditation_year` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccreditationMadrasah` ADD CONSTRAINT `AccreditationMadrasah_madrasah_id_fkey` FOREIGN KEY (`madrasah_id`) REFERENCES `Madrasah`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
