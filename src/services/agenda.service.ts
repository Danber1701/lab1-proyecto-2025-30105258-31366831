import * as agendaRepo from '../repositories/agenda.repository';
import prisma from '../config/database';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';

export const listarAgendas = async (filtros: any = {}) => {
  return await agendaRepo.getAll(filtros);
};

export const registrarAgenda = async (data: any) => {
  const fechaInicio = new Date(data.inicio);
  const fechaFin = new Date(data.fin);

  if (fechaInicio >= fechaFin) {
    throw new BadRequestError('La fecha de inicio debe ser anterior a la de fin');
  }

  // 1. Validar Profesional y su habilitación (Requerimiento 2.1)
  const profesional = await prisma.profesional.findUnique({ where: { id: data.profesionalId } });
  if (!profesional) throw new BadRequestError(`El profesional con ID ${data.profesionalId} no existe`);
  
  if (!profesional.agendaHabilitada || profesional.estado !== 'activo') {
    throw new BadRequestError('El profesional no tiene permiso para habilitar agendas o está inactivo');
  }

  // 2. Validar Unidad
  const unidadExiste = await prisma.unidadAtencion.findUnique({ where: { id: data.unidadId } });
  if (!unidadExiste) throw new BadRequestError(`La unidad con ID ${data.unidadId} no existe`);

  // 3. Validar Solapamiento
  const solapada = await agendaRepo.findOverlap(data.profesionalId, fechaInicio, fechaFin);
  if (solapada) {
    throw new ConflictError('El profesional ya tiene una agenda abierta que se cruza con este horario');
  }
  
  return await agendaRepo.create(data);
};

export const actualizarEstado = async (id: number, estado: string) => {
  const agenda = await prisma.agenda.findUnique({ where: { id } });
  if (!agenda) throw new NotFoundError('Agenda no encontrada');
  
  return await agendaRepo.updateStatus(id, estado);
};