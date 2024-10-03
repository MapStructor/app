-- CreateTable
CREATE TABLE `LayerSection` (
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Layer` (
    `id` VARCHAR(191) NOT NULL,
    `sectionName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Layer` ADD CONSTRAINT `Layer_sectionName_fkey` FOREIGN KEY (`sectionName`) REFERENCES `LayerSection`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
