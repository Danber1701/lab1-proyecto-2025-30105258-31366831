-- AlterTable
ALTER TABLE `Prestacion` ADD COLUMN `estado` VARCHAR(20) NOT NULL DEFAULT 'activo',
    ADD COLUMN `requiereAutorizacion` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tipo` VARCHAR(50) NOT NULL DEFAULT 'CONSULTA';

-- CreateIndex
CREATE INDEX `Prestacion_tipo_idx` ON `Prestacion`(`tipo`);
