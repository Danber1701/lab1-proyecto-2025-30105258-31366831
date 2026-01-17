import * as episodiosRepo from '../repositories/episodios.repository';
import prisma from '../config/database';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const listarEpisodios = async (filtros: any = {}) => {
  return await episodiosRepo.getAll(filtros);
};

export const abrirEpisodio = async (data: any) => {
  // 1. Validar si ya existe un episodio abierto (Regla de negocio)
  const abierto = await prisma.episodioAtencion.findFirst({
    where: { 
      personaId: data.personaId,
      estado: 'abierto'
    }
  });

  if (abierto) {
    throw new BadRequestError('El paciente ya tiene un episodio de atención abierto');
  }

  // 2. Verificar que profesional y paciente existan antes de abrir
  const [paciente, profesional] = await Promise.all([
    prisma.personaAtendida.findUnique({ where: { id: data.personaId } }),
    prisma.profesional.findUnique({ where: { id: data.profesionalId } })
  ]);

  if (!paciente) throw new NotFoundError('Paciente no encontrado');
  if (!profesional) throw new NotFoundError('Profesional no encontrado');

  return await episodiosRepo.create(data);
};

export const obtenerDetalleEpisodio = async (id: number) => {
  const episodio = await episodiosRepo.getById(id);
  if (!episodio) throw new NotFoundError('Episodio no encontrado');
  return episodio;
};

export const cerrarEpisodio = async (id: number) => {
  const episodio = await episodiosRepo.getById(id);
  if (!episodio) throw new NotFoundError('Episodio no encontrado');
  if (episodio.estado === 'cerrado') throw new BadRequestError('El episodio ya está cerrado');

  // Regla: No cerrar con órdenes pendientes (Punto 2.4 de Oscar)
  const ordenesPendientes = await prisma.orden.count({
    where: {
      episodioId: id,
      estado: { in: ['emitida', 'en_proceso'] } 
    }
  });

  if (ordenesPendientes > 0) {
    throw new BadRequestError(`No se puede cerrar: existen ${ordenesPendientes} órdenes pendientes.`);
  }

  return await episodiosRepo.update(id, { estado: 'cerrado' });
};