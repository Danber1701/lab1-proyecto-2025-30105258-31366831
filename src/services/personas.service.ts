import * as personaRepo from '../repositories/personas.repository';
import { ConflictError, NotFoundError } from '../utils/errors';
import prisma from '../config/database';

export const listarPersonas = async () => {
  return await personaRepo.getAll();
};

export const listarArchivados = async () => {
  return await personaRepo.getArchived();
};

export const registrarPersona = async (data: any) => {
  const existe = await personaRepo.getByDocumento(data.numeroDocumento);
  if (existe) {
    throw new ConflictError('Ya existe una persona registrada con este documento');
  }
  return await personaRepo.create(data);
};

export const eliminarPersona = async (id: number) => {
  const persona = await personaRepo.getById(id);
  if (!persona) {
    throw new NotFoundError('La persona no existe o ya ha sido desactivada');
  }
  return await personaRepo.softDelete(id);
};

export const restaurarPersona = async (id: number) => {
  const persona = await prisma.personaAtendida.findUnique({ where: { id } });
  
  if (!persona) {
    throw new NotFoundError('La persona no existe');
  }
  if (persona.estado === 'activo') {
    throw new ConflictError('La persona ya se encuentra activa');
  }
  
  return await personaRepo.restore(id);
};