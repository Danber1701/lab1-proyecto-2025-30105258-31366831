import * as prestacionesRepo from '../repositories/prestaciones.repository';
import { ConflictError } from '../utils/errors';

export const registrarPrestacion = async (data: any) => {
  // Validar si ya existe por código (que es tu @id)
  const existe = await prestacionesRepo.getByCodigo(data.codigo);
  if (existe) {
    throw new ConflictError(`Ya existe una prestación con el código ${data.codigo}`);
  }

  return await prestacionesRepo.create(data);
};

export const listarPrestaciones = async () => {
  return await prestacionesRepo.getAll();
};