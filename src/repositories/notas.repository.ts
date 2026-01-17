import prisma from '../config/database';

export const create = async (data: any) => {
  return await prisma.notaClinica.create({
    data,
    include: {
      profesional: {
        select: { id: true, nombres: true, apellidos: true, especialidad: true }
      }
    }
  });
};

export const getLatestByProfesional = async (episodioId: number, profesionalId: number) => {
  return await prisma.notaClinica.findFirst({
    where: { episodioId, profesionalId },
    orderBy: { version: 'desc' }
  });
};

export const getByEpisodio = async (episodioId: number) => {
  return await prisma.notaClinica.findMany({
    where: { episodioId },
    include: {
      profesional: {
        select: { id: true, nombres: true, apellidos: true, especialidad: true }
      }
    },
    orderBy: [
      { fecha: 'desc' },
      { version: 'desc' }
    ]
  });
};