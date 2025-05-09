/*
  Warnings:

  - You are about to drop the `source` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paint` to the `Layer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceType` to the `Layer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `Layer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `layer` DROP FOREIGN KEY `Layer_sourceUrl_fkey`;

-- AlterTable
ALTER TABLE `layer` ADD COLUMN `paint` VARCHAR(191) NOT NULL,
    ADD COLUMN `sourceType` VARCHAR(191) NOT NULL,
    ADD COLUMN `visibility` BOOLEAN NOT NULL;

-- DropTable
DROP TABLE `source`;
