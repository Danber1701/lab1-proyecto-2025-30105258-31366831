import prisma from '../config/database';

export const getAll = async () => {
  return await prisma.profesional.findMany({
    orderBy: { apellidos: 'asc' }
  });
};

export const getByRegistro = async (registro: string) => {
  return await prisma.profesional.findUnique({
    where: { registroProfesional: registro }
  });
};

export const getByEmail = async (correo: string) => {
  return await prisma.profesional.findUnique({
    where: { correo }
  });
};

export const create = async (data: any) => {
  return await prisma.profesional.create({ data });
};