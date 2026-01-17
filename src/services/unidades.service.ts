import * as unidadesRepo from '../repositories/unidades.repository';

export const listarUnidades = async () => {
  return await unidadesRepo.getAll();
};

export const registrarUnidad = async (data: any) => {
  // Aquí podrías validar si ya existe una unidad con el mismo nombre y dirección
  return await unidadesRepo.create(data);
};