-- DropIndex
DROP INDEX `Afiliacion_numeroPoliza_idx` ON `Afiliacion`;

-- DropIndex
DROP INDEX `Agenda_estado_idx` ON `Agenda`;

-- DropIndex
DROP INDEX `Cita_estado_idx` ON `Cita`;

-- DropIndex
DROP INDEX `EpisodioAtencion_estado_idx` ON `EpisodioAtencion`;

-- DropIndex
DROP INDEX `Orden_estado_idx` ON `Orden`;

-- DropIndex
DROP INDEX `PersonaAtendida_estado_idx` ON `PersonaAtendida`;

-- DropIndex
DROP INDEX `Prestacion_tipo_idx` ON `Prestacion`;

-- DropIndex
DROP INDEX `Profesional_estado_idx` ON `Profesional`;

-- DropIndex
DROP INDEX `UnidadAtencion_estado_idx` ON `UnidadAtencion`;

-- CreateTable
CREATE TABLE `Prescripcion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `episodioId` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observaciones` TEXT NULL,

    INDEX `Prescripcion_episodioId_idx`(`episodioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrescripcionItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescripcionId` INTEGER NOT NULL,
    `medicamentoCodigo` VARCHAR(100) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `dosis` VARCHAR(100) NOT NULL,
    `via` VARCHAR(50) NOT NULL,
    `frecuencia` VARCHAR(100) NOT NULL,
    `duracion` VARCHAR(100) NOT NULL,

    INDEX `PrescripcionItem_prescripcionId_idx`(`prescripcionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Autorizacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ordenId` INTEGER NULL,
    `planId` INTEGER NOT NULL,
    `procedimientoCod` VARCHAR(100) NULL,
    `estado` VARCHAR(50) NOT NULL DEFAULT 'solicitada',
    `fechaSolicitud` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaRespuesta` DATETIME(3) NULL,
    `numeroAutorizacion` VARCHAR(100) NULL,
    `observaciones` TEXT NULL,

    UNIQUE INDEX `Autorizacion_ordenId_key`(`ordenId`),
    INDEX `Autorizacion_planId_idx`(`planId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prescripcion` ADD CONSTRAINT `Prescripcion_episodioId_fkey` FOREIGN KEY (`episodioId`) REFERENCES `EpisodioAtencion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescripcionItem` ADD CONSTRAINT `PrescripcionItem_prescripcionId_fkey` FOREIGN KEY (`prescripcionId`) REFERENCES `Prescripcion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Autorizacion` ADD CONSTRAINT `Autorizacion_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `PlanCobertura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Autorizacion` ADD CONSTRAINT `Autorizacion_ordenId_fkey` FOREIGN KEY (`ordenId`) REFERENCES `Orden`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
