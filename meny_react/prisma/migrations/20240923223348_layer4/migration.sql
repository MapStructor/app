/*
  Warnings:

  - You are about to drop the column `name` on the `layer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `layer` DROP FOREIGN KEY `Layer_name_fkey`;

-- AlterTable
ALTER TABLE `layer` DROP COLUMN `name`,
    ADD COLUMN `sectionName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Layer` ADD CONSTRAINT `Layer_sectionName_fkey` FOREIGN KEY (`sectionName`) REFERENCES `LayerSectionData`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
