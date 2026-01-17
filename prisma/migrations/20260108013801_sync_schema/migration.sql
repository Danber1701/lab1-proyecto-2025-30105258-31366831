/*
  Warnings:

  - You are about to alter the column `impuestos` on the `Arancel` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE `Arancel` MODIFY `impuestos` DECIMAL(15, 2) NOT NULL DEFAULT 0;

-- RenameIndex
ALTER TABLE `Arancel` RENAME INDEX `Arancel_prestacionCodigo_fkey` TO `Arancel_prestacionCodigo_idx`;
