import * as aseguradorasRepo from '../repositories/aseguradoras.repository';
import { ConflictError } from '../utils/errors';

export const listarAseguradoras = async () => {
  return await aseguradorasRepo.getAll();
};

export const registrarAseguradora = async (data: any) => {
  const existe = await aseguradorasRepo.getByNit(data.nit);
  if (existe) {
    throw new ConflictError('Ya existe una aseguradora registrada con este NIT');
  }

  return await aseguradorasRepo.create(data);
};