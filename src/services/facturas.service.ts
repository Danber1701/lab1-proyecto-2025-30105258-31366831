import prisma from '../config/database';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const generarFactura = async (data: any) => {
  return await (prisma as any).$transaction(async (tx: any) => {
    let subtotalGeneral = 0;
    let impuestosGeneral = 0;

    // 1. Verificar afiliación activa
    const afiliacion = await tx.afiliacion.findFirst({
      where: { 
        personaId: data.personaId, 
        estado: 'activa' 
      },
      include: { plan: true }
    });

    if (!afiliacion) {
      throw new BadRequestError(`El paciente con ID ${data.personaId} no tiene una afiliación activa.`);
    }

    const itemsProcesados = await Promise.all(data.items.map(async (item: any) => {
      // 2. Obtener arancel vigente para el plan del paciente
      const arancel = await tx.arancel.findFirst({
        where: {
          prestacionCodigo: item.prestacionCodigo,
          estado: 'vigente',
          planId: afiliacion.planId 
        },
        include: { prestacion: true }
      });

      if (!arancel) {
        throw new BadRequestError(`No existe un arancel vigente para la prestación ${item.prestacionCodigo} bajo el plan ${afiliacion.plan.nombre}.`);
      }

      // 3. REGLA DE NEGOCIO: Validar Autorización si la prestación lo requiere
      if (arancel.prestacion.requiereAutorizacion) {
        const autorizacion = await tx.autorizacion.findFirst({
          where: {
            procedimientoCod: item.prestacionCodigo,
            planId: afiliacion.planId,
            estado: 'aprobada'
          }
        });

        if (!autorizacion) {
          throw new BadRequestError(`La prestación ${item.prestacionCodigo} requiere una autorización aprobada.`);
        }
      }

      const valorU = Number(arancel.valorBase);
      const impU = Number(arancel.impuestos);
      
      subtotalGeneral += valorU * item.cantidad;
      impuestosGeneral += impU * item.cantidad;

      return {
        prestacionCodigo: item.prestacionCodigo,
        descripcion: arancel.prestacion.nombre,
        cantidad: item.cantidad,
        valorUnitario: valorU,
        impuestos: impU,
        total: (valorU + impU) * item.cantidad
      };
    }));

    // 4. Crear factura definitiva
    return await tx.factura.create({
      data: {
        numero: `FAC-${Date.now()}`,
        personaId: data.personaId,
        aseguradoraId: afiliacion.plan.aseguradoraId,
        subtotal: subtotalGeneral,
        impuestos: impuestosGeneral,
        total: subtotalGeneral + impuestosGeneral,
        estado: 'emitida',
        items: { create: itemsProcesados }
      },
      include: { items: true }
    });
  });
};

/**
 * Servicio para buscar factura por ID
 */
export const obtenerFacturaPorId = async (id: number) => {
  const factura = await (prisma as any).factura.findUnique({
    where: { id },
    include: { 
      items: true, 
      persona: true, 
      pagos: true 
    }
  });

  if (!factura) {
    throw new NotFoundError(`La factura con ID ${id} no existe.`);
  }

  return factura;
};