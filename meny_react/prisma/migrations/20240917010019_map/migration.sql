-- CreateTable
CREATE TABLE `Map` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `checked` BOOLEAN NOT NULL,
    `infoId` VARCHAR(191) NOT NULL,
    `zoomFunction` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Map_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
