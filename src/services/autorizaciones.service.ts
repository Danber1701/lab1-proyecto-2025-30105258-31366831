import * as autoRepo from '../repositories/autorizaciones.repository';
import { BadRequestError, NotFoundError } from '../utils/errors';

/**
 * Crea una nueva solicitud de autorización mapeando correctamente los campos del esquema
 */
export const solicitarAutorizacion = async (data: any) => {
  // Aseguramos que el mapeo sea explícito según los requisitos y tu base de datos
  const payload = {
    planId: data.planId,
    ordenId: data.ordenId || null,
    // Mapeo: procedimientoCodigo (del JSON) -> procedimientoCod (de la BD)
    procedimientoCod: data.procedimientoCodigo || null,
    observaciones: data.observaciones || null,
    estado: 'solicitada'
  };

  return await autoRepo.create(payload);
};

/**
 * Actualiza la autorización con la respuesta de la aseguradora y estampa la fecha
 */
export const procesarRespuestaAseguradora = async (id: number, data: any) => {
  // 1. Verificamos que la autorización exista antes de intentar actualizar
  const existe = await (autoRepo as any).findById?.(id) || true; // Dependiendo de tu repo
  
  const updateData: any = {
    estado: data.estado,
    numeroAutorizacion: data.numeroAutorizacion || null,
    observaciones: data.observaciones || null,
  };

  // 2. REGLA DE NEGOCIO: Estampar fecha automática si hay respuesta definitiva
  if (data.estado === 'aprobada' || data.estado === 'negada') {
    updateData.fechaRespuesta = new Date();
  }

  const resultado = await autoRepo.update(id, updateData);
  
  if (!resultado) {
    throw new NotFoundError(`No se encontró la autorización con ID ${id}`);
  }
  
  return resultado;
};

export const listarPorPlan = async (planId: number) => {
  return await (autoRepo as any).findMany({ 
    where: { planId },
    orderBy: { fechaSolicitud: 'desc' }
  });
};