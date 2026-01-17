import prisma from '../config/database';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const registrarPago = async (data: any) => {
  return await (prisma as any).$transaction(async (tx: any) => {
    // 1. Validar factura y saldos
    const factura = await tx.factura.findUnique({
      where: { id: data.facturaId },
      include: { pagos: true }
    });

    if (!factura) throw new NotFoundError('La factura no existe');
    if (factura.estado === 'pagada') throw new BadRequestError('La factura ya está saldada');

    const totalPagado = factura.pagos.reduce((acc: number, p: any) => acc + Number(p.monto), 0);
    const saldoPendiente = Number(factura.total) - totalPagado;

    // Validar que no se pague de más (con margen de error decimal)
    if (data.monto > saldoPendiente + 0.01) {
      throw new BadRequestError(`Monto excede el saldo pendiente ($${saldoPendiente.toFixed(2)})`);
    }

    // 2. Crear el registro del Pago
    const nuevoPago = await tx.pago.create({
      data: {
        facturaId: data.facturaId,
        monto: data.monto,
        medio: data.medio,
        referencia: data.referencia,
        fecha: new Date(),
        estado: 'exitoso'
      }
    });

    // 3. Actualizar estado de la factura
    const esPagoTotal = (totalPagado + data.monto) >= Number(factura.total) - 0.01;
    await tx.factura.update({
      where: { id: data.facturaId },
      data: { estado: esPagoTotal ? 'pagada' : 'pago_parcial' }
    });

    return nuevoPago;
  });
};

export const obtenerHistorialPorFactura = async (facturaId: number) => {
  return await (prisma as any).pago.findMany({
    where: { facturaId },
    orderBy: { fecha: 'desc' }
  });
};

export const obtenerCierreCajaDiario = async () => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return await (prisma as any).pago.groupBy({
    by: ['medio'],
    _sum: { monto: true },
    where: {
      fecha: { gte: hoy },
      estado: 'exitoso'
    }
  });
};