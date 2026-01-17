import prisma from '../config/database';

export const getAll = async (filtros: any = {}) => {
  const { personaId, estado } = filtros;
  return await prisma.episodioAtencion.findMany({
    where: {
      personaId: personaId ? Number(personaId) : undefined,
      estado: estado || undefined
    },
    include: {
      persona: { select: { id: true, nombres: true, apellidos: true, numeroDocumento: true } },
      profesional: { select: { id: true, nombres: true, apellidos: true, especialidad: true } },
      _count: {
        select: { notasClinicas: true, diagnosticos: true, ordenes: true }
      }
    },
    orderBy: { fechaApertura: 'desc' }
  });
};

export const create = async (data: any) => {
  return await prisma.episodioAtencion.create({
    data: {
      personaId: data.personaId,
      profesionalId: data.profesionalId,
      motivo: data.motivo,
      tipo: data.tipo,
      estado: 'abierto'
    }
  });
};

export const getById = async (id: number) => {
  return await prisma.episodioAtencion.findUnique({
    where: { id },
    include: {
      persona: true,
      profesional: true,
      notasClinicas: { orderBy: { fecha: 'desc' } },
      diagnosticos: true,
      ordenes: { include: { resultados: true } }
    }
  });
};

export const update = async (id: number, data: any) => {
  return await prisma.episodioAtencion.update({
    where: { id },
    data
  });
};