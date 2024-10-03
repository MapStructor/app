/*
  Warnings:

  - You are about to drop the column `sectionName` on the `layer` table. All the data in the column will be lost.
  - Added the required column `name` to the `Layer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceUrl` to the `Layer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Layer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `layer` DROP FOREIGN KEY `Layer_sectionName_fkey`;

-- AlterTable
ALTER TABLE `layer` DROP COLUMN `sectionName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `sourceUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `LayerSectionData` (
    `name` VARCHAR(191) NOT NULL,
    `sectionName` VARCHAR(191) NOT NULL,
    `iconColor` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `zoomTo` VARCHAR(191) NOT NULL,
    `topLayerClass` VARCHAR(191) NOT NULL,
    `infoId` VARCHAR(191) NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LayerGroup` (
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Source` (
    `type` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LayerSectionData` ADD CONSTRAINT `LayerSectionData_sectionName_fkey` FOREIGN KEY (`sectionName`) REFERENCES `LayerSection`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LayerSectionData` ADD CONSTRAINT `LayerSectionData_topLayerClass_fkey` FOREIGN KEY (`topLayerClass`) REFERENCES `LayerGroup`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Layer` ADD CONSTRAINT `Layer_name_fkey` FOREIGN KEY (`name`) REFERENCES `LayerSectionData`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Layer` ADD CONSTRAINT `Layer_sourceUrl_fkey` FOREIGN KEY (`sourceUrl`) REFERENCES `Source`(`url`) ON DELETE RESTRICT ON UPDATE CASCADE;
