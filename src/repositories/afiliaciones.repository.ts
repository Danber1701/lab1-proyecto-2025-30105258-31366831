import prisma from '../config/database';

export const getAll = async () => {
  return await prisma.afiliacion.findMany({
    include: {
      persona: { select: { nombres: true, apellidos: true, numeroDocumento: true } },
      plan: { include: { aseguradora: true } }
    }
  });
};

export const getByPacienteYPlan = async (personaId: number, planId: number) => {
  return await prisma.afiliacion.findUnique({
    where: {
      personaId_planId: { personaId, planId }
    }
  });
};

export const create = async (data: any) => {
  return await prisma.afiliacion.create({
    data: {
      ...data,
      vigenteDesde: new Date(data.vigenteDesde),
      vigenteHasta: new Date(data.vigenteHasta),
      // Prisma maneja Decimal, pero pasamos el número directamente
      copago: data.copago,
      cuotaModeradora: data.cuotaModeradora
    }
  });
};