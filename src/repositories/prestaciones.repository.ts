import prisma from '../config/database';

export const create = async (data: any) => {
  return await prisma.prestacion.create({
    data: data
  });
};

export const getByCodigo = async (codigo: string) => {
  return await prisma.prestacion.findUnique({
    where: { codigo }
  });
};

export const getAll = async () => {
  return await prisma.prestacion.findMany({
    orderBy: { nombre: 'asc' }
  });
};