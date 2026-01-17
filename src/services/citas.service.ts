import * as citasRepo from '../repositories/citas.repository';
import prisma from '../config/database';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';

export const listarCitas = async (filtros: any = {}) => {
  return await citasRepo.getAll(filtros);
};

export const agendarCita = async (data: any) => {
  const fechaInicio = new Date(data.inicio);
  const fechaFin = new Date(data.fin);

  if (fechaInicio >= fechaFin) {
    throw new BadRequestError('La hora de fin debe ser posterior a la de inicio');
  }

  if (data.agendaId) {
    const agenda = await prisma.agenda.findUnique({ where: { id: data.agendaId } });
    if (!agenda) throw new BadRequestError('La agenda seleccionada no existe');
    if (agenda.estado !== 'abierto') throw new BadRequestError('La agenda no está abierta');

    const citasAgendadas = await prisma.cita.count({
      where: { 
        agendaId: data.agendaId,
        estado: { notIn: ['cancelada', 'noAsistida'] }
      }
    });

    if (citasAgendadas >= agenda.capacidad) {
      throw new ConflictError('La agenda ha alcanzado su capacidad máxima');
    }
  }

  const crucePaciente = await citasRepo.findPacienteOverlap(data.personaId, fechaInicio, fechaFin);
  if (crucePaciente) throw new ConflictError('El paciente ya tiene una cita en este horario');

  return await citasRepo.create(data);
};

export const cambiarEstado = async (id: number, nuevoEstado: string, observaciones?: string) => {
  const cita = await prisma.cita.findUnique({ where: { id } });
  if (!cita) throw new NotFoundError('Cita no encontrada');

  // Transición válida
  if (cita.estado === 'cancelada' || cita.estado === 'cumplida') {
    throw new BadRequestError(`No se puede modificar una cita en estado ${cita.estado}`);
  }

  return await citasRepo.updateStatus(id, nuevoEstado, observaciones);
};