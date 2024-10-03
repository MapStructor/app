-- DropForeignKey
ALTER TABLE `layer` DROP FOREIGN KEY `Layer_name_fkey`;

-- DropIndex
DROP INDEX `Layer_sourceUrl_fkey` ON `layer`;

-- AlterTable
ALTER TABLE `layer` MODIFY `name` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Layer` ADD CONSTRAINT `Layer_name_fkey` FOREIGN KEY (`name`) REFERENCES `LayerSectionData`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
