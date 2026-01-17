import * as notasRepo from '../repositories/notas-contables.repository';
import prisma from '../config/database';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const registrarNota = async (data: any) => {
  return await (prisma as any).$transaction(async (tx: any) => {
    // 1. Usar el repo para buscar la factura
    const factura = await tx.factura.findUnique({
      where: { id: data.facturaId },
      include: { pagos: true }
    });

    if (!factura) throw new NotFoundError('Factura no encontrada');

    if (data.tipo === 'CREDITO') {
      // Registrar movimiento de crédito
      const nota = await tx.pago.create({
        data: {
          facturaId: data.facturaId,
          monto: data.monto,
          medio: 'transferencia',
          referencia: `[NOTA CRÉDITO] ${data.motivo}`,
          estado: 'exitoso'
        }
      });

      // Validar si la factura se salda
      const totalPagado = factura.pagos.reduce((acc: number, p: any) => acc + Number(p.monto), 0) + data.monto;
      if (totalPagado >= Number(factura.total) - 0.01) {
        await tx.factura.update({ where: { id: data.facturaId }, data: { estado: 'pagada' } });
      }
      return nota;

    } else {
      // Nota de Débito: Aumentar total
      return await tx.factura.update({
        where: { id: data.facturaId },
        data: { 
          total: Number(factura.total) + data.monto,
          estado: 'pago_parcial' 
        }
      });
    }
  });
};