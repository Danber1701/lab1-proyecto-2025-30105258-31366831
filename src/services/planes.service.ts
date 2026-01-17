import * as planesRepo from '../repositories/planes.repository';
import prisma from '../config/database';
import { BadRequestError } from '../utils/errors';

export const listarPlanes = async () => {
  return await planesRepo.getAll();
};

export const registrarPlan = async (data: any) => {
  // Validar que la aseguradora exista
  const aseguradora = await prisma.aseguradora.findUnique({
    where: { id: data.aseguradoraId }
  });

  if (!aseguradora) {
    throw new BadRequestError(`La aseguradora con ID ${data.aseguradoraId} no existe`);
  }

  return await planesRepo.create(data);
};