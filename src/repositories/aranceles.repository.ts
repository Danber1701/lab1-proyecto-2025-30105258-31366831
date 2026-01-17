import prisma from '../config/database';

export const getAll = async () => {
  return await prisma.arancel.findMany({
    include: {
      prestacion: { select: { nombre: true, grupo: true } },
      plan: { select: { nombre: true } }
    }
  });
};

export const create = async (data: any) => {
  return await prisma.arancel.create({
    data: {
      ...data,
      vigenteDesde: new Date(data.vigenteDesde),
      vigenteHasta: new Date(data.vigenteHasta),
      // Prisma manejará la conversión a Decimal de MySQL automáticamente
    }
  });
};