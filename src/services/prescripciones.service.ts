import * as prescripRepo from '../repositories/prescripciones.repository';
import prisma from '../config/database';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const registrarPrescripcion = async (data: any) => {
  // 1. Validar episodio abierto
  const episodio = await prisma.episodioAtencion.findUnique({
    where: { id: data.episodioId }
  });

  if (!episodio) throw new NotFoundError('Episodio no encontrado');
  if (episodio.estado !== 'abierto') {
    throw new BadRequestError('No se pueden emitir recetas en un episodio cerrado');
  }

  // 2. Podrías validar aquí stock o interacciones si tuvieras el catálogo
  return await prescripRepo.create(data);
};

export const listarPorEpisodio = async (episodioId: number) => {
  return await prescripRepo.getByEpisodio(episodioId);
};