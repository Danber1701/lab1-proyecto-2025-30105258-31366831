import prisma from '../config/database';

export const getAll = async () => {
  // Solo devuelve personas con estado activo
  return await prisma.personaAtendida.findMany({
    where: { estado: 'activo' }
  });
};

export const getArchived = async () => {
  // Solo devuelve personas con estado inactivo
  return await prisma.personaAtendida.findMany({
    where: { estado: 'inactivo' }
  });
};

export const getById = async (id: number) => {
  return await prisma.personaAtendida.findFirst({
    where: { id, estado: 'activo' }
  });
};

export const getByDocumento = async (numero: string) => {
  return await prisma.personaAtendida.findUnique({
    where: { numeroDocumento: numero }
  });
};

export const create = async (data: any) => {
  return await prisma.personaAtendida.create({
    data: {
      ...data,
      fechaNacimiento: new Date(data.fechaNacimiento),
    }
  });
};

export const softDelete = async (id: number) => {
  return await prisma.personaAtendida.update({
    where: { id },
    data: { estado: 'inactivo' }
  });
};

export const restore = async (id: number) => {
  return await prisma.personaAtendida.update({
    where: { id },
    data: { estado: 'activo' }
  });
};