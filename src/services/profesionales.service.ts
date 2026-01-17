import * as profesionalRepo from '../repositories/profesionales.repository';
import { ConflictError } from '../utils/errors';

export const listarProfesionales = async () => {
  return await profesionalRepo.getAll();
};

export const registrarProfesional = async (data: any) => {
  // Verificar duplicado por Registro Profesional
  const existeRegistro = await profesionalRepo.getByRegistro(data.registroProfesional);
  if (existeRegistro) {
    throw new ConflictError('Ya existe un profesional con este registro médico');
  }

  // Verificar duplicado por Email
  const existeEmail = await profesionalRepo.getByEmail(data.correo);
  if (existeEmail) {
    throw new ConflictError('El correo ya está asignado a otro profesional');
  }

  return await profesionalRepo.create(data);
};