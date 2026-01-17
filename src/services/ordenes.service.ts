import * as ordenesRepo from '../repositories/ordenes.repository';
import prisma from '../config/database';
import { BadRequestError } from '../utils/errors';

export const generarOrden = async (data: any) => {
  const episodio = await prisma.episodioAtencion.findUnique({
    where: { id: data.episodioId }
  });

  if (!episodio || episodio.estado !== 'abierto') {
    throw new BadRequestError('No se pueden generar órdenes para episodios inexistentes o cerrados');
  }

  return await ordenesRepo.createWithItems(data);
};

export const listarPorEpisodio = async (episodioId: number) => {
  return await ordenesRepo.getByEpisodio(episodioId);
};