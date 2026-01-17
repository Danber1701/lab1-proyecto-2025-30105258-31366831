import * as notasRepo from '../repositories/notas.repository';
import prisma from '../config/database';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const registrarNota = async (data: any) => {
  // 1. Validar que el episodio exista y esté ABIERTO
  const episodio = await prisma.episodioAtencion.findUnique({
    where: { id: data.episodioId }
  });

  if (!episodio) throw new NotFoundError('El episodio de atención no existe');
  if (episodio.estado !== 'abierto') {
    throw new BadRequestError('No se pueden registrar notas en un episodio cerrado o cancelado');
  }

  // 2. Lógica de Versionado Automático (Punto 3 de Oscar: Trazabilidad)
  const ultimaNota = await notasRepo.getLatestByProfesional(data.episodioId, data.professionalId);
  const nuevaVersion = ultimaNota ? ultimaNota.version + 1 : 1;

  // 3. Persistencia
  const notaData = {
    episodioId: data.episodioId,
    profesionalId: data.profesionalId,
    subjetivo: data.subjetivo,
    objetivo: data.objetivo,
    analisis: data.analisis,
    plan: data.plan,
    version: nuevaVersion
  };

  return await notasRepo.create(notaData);
};

export const listarPorEpisodio = async (episodioId: number) => {
  return await notasRepo.getByEpisodio(episodioId);
};