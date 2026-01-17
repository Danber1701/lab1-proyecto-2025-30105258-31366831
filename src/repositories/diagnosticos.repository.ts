import prisma from '../config/database';

export const create = async (data: any) => {
  return await prisma.diagnostico.create({
    data
  });
};

export const getByEpisodio = async (episodioId: number) => {
  return await prisma.diagnostico.findMany({
    where: { episodioId },
    orderBy: { principal: 'desc' } 
  });
};

// Centralizamos el reset aquí para mantener el Service limpio
export const unsetPrincipalInEpisodio = async (episodioId: number) => {
  return await prisma.diagnostico.updateMany({
    where: { episodioId, principal: true },
    data: { principal: false }
  });
};