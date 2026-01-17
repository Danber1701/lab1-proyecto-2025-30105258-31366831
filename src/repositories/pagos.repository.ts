import prisma from '../config/database';

export const create = async (data: any) => {
  return await (prisma as any).pago.create({
    data: {
      ...data,
      fecha: new Date()
    }
  });
};

export const getByFactura = async (facturaId: number) => {
  return await (prisma as any).pago.findMany({
    where: { facturaId },
    orderBy: { fecha: 'desc' }
  });
};

export const getCierreDiario = async (fechaInicio: Date) => {
  return await (prisma as any).pago.groupBy({
    by: ['medio'],
    where: {
      fecha: { gte: fechaInicio },
      estado: 'exitoso'
    },
    _sum: {
      monto: true
    }
  });
};