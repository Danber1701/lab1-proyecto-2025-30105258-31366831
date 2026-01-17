import * as diagnosticoRepo from '../repositories/diagnosticos.repository';
import prisma from '../config/database'; // Solo para validaciones de existencia rápidas
import { BadRequestError, NotFoundError } from '../utils/errors';

export const registrarDiagnostico = async (data: any) => {
  // 1. Validar episodio
  const episodio = await prisma.episodioAtencion.findUnique({
    where: { id: data.episodioId }
  });

  if (!episodio) throw new NotFoundError('El episodio no existe');
  if (episodio.estado !== 'abierto') {
    throw new BadRequestError('No se pueden añadir diagnósticos a un episodio cerrado');
  }

  // 2. REGLA: Diagnóstico principal único
  if (data.principal) {
    // Usamos el repositorio para limpiar los anteriores
    await diagnosticoRepo.unsetPrincipalInEpisodio(data.episodioId);
  }

  return await diagnosticoRepo.create(data);
};

export const listarPorEpisodio = async (episodioId: number) => {
  return await diagnosticoRepo.getByEpisodio(episodioId);
};