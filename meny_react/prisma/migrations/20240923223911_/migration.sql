/*
  Warnings:

  - Added the required column `layerName` to the `Layer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `layer` ADD COLUMN `layerName` VARCHAR(191) NOT NULL;
