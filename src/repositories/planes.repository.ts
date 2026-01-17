import prisma from '../config/database';

export const getAll = async () => {
  return await prisma.planCobertura.findMany({
    include: {
      aseguradora: {
        select: { nombre: true, nit: true }
      }
    },
    orderBy: { nombre: 'asc' }
  });
};

export const getByAseguradora = async (aseguradoraId: number) => {
  return await prisma.planCobertura.findMany({
    where: { aseguradoraId }
  });
};

export const create = async (data: any) => {
  return await prisma.planCobertura.create({ data });
};