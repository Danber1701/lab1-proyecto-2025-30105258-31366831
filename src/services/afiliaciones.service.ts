import * as afiliacionesRepo from '../repositories/afiliaciones.repository';
import prisma from '../config/database';
import { BadRequestError, ConflictError } from '../utils/errors';

export const registrarAfiliacion = async (data: any) => {
  const desde = new Date(data.vigenteDesde);
  const hasta = new Date(data.vigenteHasta);

  if (desde >= hasta) {
    throw new BadRequestError('La fecha de vigencia inicial debe ser menor a la final');
  }

  // 1. Validar existencia de Persona y Plan (Evitar FK Error)
  const persona = await prisma.personaAtendida.findUnique({ where: { id: data.personaId } });
  if (!persona) throw new BadRequestError('El paciente no existe');

  const plan = await prisma.planCobertura.findUnique({ where: { id: data.planId } });
  if (!plan) throw new BadRequestError('El plan de cobertura no existe');

  // 2. Validar que no exista ya esta afiliación específica
  const existe = await afiliacionesRepo.getByPacienteYPlan(data.personaId, data.planId);
  if (existe) {
    throw new ConflictError('Este paciente ya cuenta con una afiliación activa a este plan');
  }

  return await afiliacionesRepo.create(data);
};

export const listarAfiliaciones = async () => {
  return await afiliacionesRepo.getAll();
};