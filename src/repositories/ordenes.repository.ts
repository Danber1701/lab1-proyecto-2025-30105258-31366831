import prisma from '../config/database';

export const createWithItems = async (data: any) => {
  const { items, ...ordenData } = data;

  return await prisma.orden.create({
    data: {
      ...ordenData,
      estado: 'emitida',
      items: {
        create: items // Crea los ítems automáticamente vinculados a esta orden
      }
    },
    include: {
      items: true
    }
  });
};

export const getByEpisodio = async (episodioId: number) => {
  return await prisma.orden.findMany({
    where: { episodioId },
    include: { items: true }
  });
};