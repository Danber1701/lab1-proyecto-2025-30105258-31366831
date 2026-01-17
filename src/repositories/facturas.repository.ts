import prisma from '../config/database';

export const getFacturaConSaldos = async (id: number) => {
  return await (prisma as any).factura.findUnique({
    where: { id },
    include: { pagos: true, items: true, persona: true }
  });
};

export const getArancelVigente = async (codigo: string, planId: number | null) => {
  return await (prisma as any).arancel.findFirst({
    where: {
      prestacionCodigo: codigo,
      planId: planId,
      estado: 'vigente',
      vigenteDesde: { lte: new Date() },
      vigenteHasta: { gte: new Date() }
    },
    include: { prestacion: true }
  });
};