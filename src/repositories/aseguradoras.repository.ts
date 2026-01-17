import prisma from '../config/database';

export const getAll = async () => {
  return await prisma.aseguradora.findMany({
    orderBy: { nombre: 'asc' },
    include: {
      _count: {
        select: { planes: true }
      }
    }
  });
};

export const getByNit = async (nit: string) => {
  return await prisma.aseguradora.findUnique({
    where: { nit }
  });
};

export const create = async (data: any) => {
  return await prisma.aseguradora.create({ data });
};