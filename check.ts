import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const aranceles = await (prisma as any).arancel.findMany();
  console.log('Datos actuales en la tabla Arancel:', aranceles);
}
main();