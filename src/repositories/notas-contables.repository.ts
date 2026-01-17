import prisma from '../config/database';

/**
 * Crea un registro de ajuste en la tabla de pagos (para Notas de Crédito)
 */
export const registrarMovimientoAjuste = async (data: any) => {
  return await (prisma as any).pago.create({
    data: {
      facturaId: data.facturaId,
      monto: data.monto,
      medio: 'transferencia',
      referencia: `[NOTA ${data.tipo}] ${data.motivo}`,
      estado: 'exitoso',
      fecha: new Date()
    }
  });
};

/**
 * Actualiza el total de la factura (usado principalmente en Notas de Débito)
 */
export const actualizarTotalFactura = async (facturaId: number, nuevoTotal: number) => {
  return await (prisma as any).factura.update({
    where: { id: facturaId },
    data: { 
      total: nuevoTotal,
      estado: 'pago_parcial' 
    }
  });
};

/**
 * Busca una factura con sus pagos actuales
 */
export const getFacturaParaAjuste = async (id: number) => {
  return await (prisma as any).factura.findUnique({
    where: { id },
    include: { pagos: true }
  });
};