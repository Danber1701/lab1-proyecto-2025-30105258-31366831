import prisma from '../config/database';

export const getAll = async (filtros: any = {}) => {
  const { personaId, profesionalId, estado } = filtros;
  
  return await prisma.cita.findMany({
    where: {
      // Filtros dinámicos: si el valor existe, se aplica; si es undefined, Prisma lo ignora.
      personaId: personaId ? Number(personaId) : undefined,
      profesionalId: profesionalId ? Number(profesionalId) : undefined,
      estado: estado || undefined,
    },
    include: {
      persona: { select: { id: true, nombres: true, apellidos: true, numeroDocumento: true } },
      profesional: { select: { id: true, nombres: true, apellidos: true, especialidad: true } },
      unidad: true,
      agenda: true
    },
    orderBy: { inicio: 'asc' }
  });
};

export const create = async (data: any) => {
  return await prisma.cita.create({
    data: {
      ...data,
      inicio: new Date(data.inicio),
      fin: new Date(data.fin),
      estado: 'solicitada'
    }
  });
};

export const updateStatus = async (id: number, nuevoEstado: string, observaciones?: string) => {
  return await prisma.cita.update({
    where: { id },
    data: { 
      estado: nuevoEstado,
      observaciones: observaciones || undefined
    }
  });
};

export const findPacienteOverlap = async (personaId: number, inicio: Date, fin: Date) => {
  return await prisma.cita.findFirst({
    where: {
      personaId,
      estado: { notIn: ['cancelada', 'noAsistida'] }, // Ajustado a camelCase según tu nuevo schema
      OR: [
        { inicio: { lt: fin }, fin: { gt: inicio } }
      ]
    }
  });
};