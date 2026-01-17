import prisma from '../config/database';

export const create = async (data: any) => {
  // Usamos casting a any para prevenir errores si el cliente no se regeneró
  return await (prisma as any).resultado.create({
    data: {
      ...data,
      fecha: new Date()
    }
  });
};

export const getByOrden = async (ordenId: number) => {
  return await (prisma as any).resultado.findMany({
    where: { ordenId },
    orderBy: { version: 'desc' }
  });
};

export const getLastVersion = async (ordenId: number) => {
  return await (prisma as any).resultado.findFirst({
    where: { ordenId },
    orderBy: { version: 'desc' }
  });
};