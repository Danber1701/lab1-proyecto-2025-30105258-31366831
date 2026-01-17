import prisma from '../config/database';

export const getAll = async () => {
  return await prisma.unidadAtencion.findMany({
    where: { estado: 'activo' },
    orderBy: { nombre: 'asc' }
  });
};

export const getById = async (id: number) => {
  return await prisma.unidadAtencion.findUnique({
    where: { id }
  });
};

export const create = async (data: any) => {
  return await prisma.unidadAtencion.create({ data });
};