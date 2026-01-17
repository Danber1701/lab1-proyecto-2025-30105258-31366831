import * as arancelRepo from '../repositories/aranceles.repository';
import prisma from '../config/database';
import { BadRequestError } from '../utils/errors';

export const listarAranceles = async () => {
  return await arancelRepo.getAll();
};

export const registrarArancel = async (data: any) => {
  const desde = new Date(data.vigenteDesde);
  const hasta = new Date(data.vigenteHasta);

  if (desde >= hasta) {
    throw new BadRequestError('La fecha vigenteDesde debe ser anterior a vigenteHasta');
  }

  // 1. Validar que la prestación exista
  const prestacion = await prisma.prestacion.findUnique({
    where: { codigo: data.prestacionCodigo }
  });
  if (!prestacion) {
    throw new BadRequestError(`La prestación con código ${data.prestacionCodigo} no existe`);
  }

  // 2. Si se provee un planId, validar que exista
  if (data.planId) {
    const plan = await prisma.planCobertura.findUnique({
      where: { id: data.planId }
    });
    if (!plan) {
      throw new BadRequestError(`El plan de cobertura con ID ${data.planId} no existe`);
    }
  }

  return await arancelRepo.create(data);
};