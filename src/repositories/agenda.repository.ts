import prisma from '../config/database';

export const getAll = async (filtros: any = {}) => {
  const { profesionalId, unidadId, inicio, fin } = filtros;

  return await prisma.agenda.findMany({
    where: {
      profesionalId: profesionalId ? Number(profesionalId) : undefined,
      unidadId: unidadId ? Number(unidadId) : undefined,
      // Filtro por rango de fechas si se proporcionan
      inicio: inicio ? { gte: new Date(inicio) } : undefined,
      fin: fin ? { lte: new Date(fin) } : undefined,
    },
    include: {
      profesional: { select: { id: true, nombres: true, apellidos: true, especialidad: true, agendaHabilitada: true } },
      unidad: true
    },
    orderBy: { inicio: 'asc' }
  });
};

export const create = async (data: any) => {
  return await prisma.agenda.create({
    data: {
      ...data,
      inicio: new Date(data.inicio),
      fin: new Date(data.fin),
      capacidad: data.capacidad || 1,
      estado: data.estado || 'abierto'
    }
  });
};

export const findOverlap = async (profesionalId: number, inicio: Date, fin: Date) => {
  return await prisma.agenda.findFirst({
    where: {
      profesionalId,
      estado: 'abierto',
      OR: [
        { inicio: { lt: fin }, fin: { gt: inicio } }
      ]
    }
  });
};

export const updateStatus = async (id: number, estado: string) => {
  return await prisma.agenda.update({
    where: { id },
    data: { estado }
  });
};