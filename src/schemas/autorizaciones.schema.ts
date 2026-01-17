import { z } from 'zod';

export const createAutorizacionSchema = z.object({
  planId: z.number().int().positive(),
  ordenId: z.number().int().positive().optional(),
  procedimientoCodigo: z.string().optional(),
  observaciones: z.string().optional(),
}).refine(data => data.ordenId || data.procedimientoCodigo, {
  message: "Debe proporcionar el ID de la orden o el código del procedimiento",
  path: ["procedimientoCodigo"] 
});

export const updateEstadoAutorizacionSchema = z.object({
  estado: z.enum(['solicitada', 'aprobada', 'negada']),
  numeroAutorizacion: z.string().optional(),
  observaciones: z.string().optional(),
}).refine(data => {
  if (data.estado === 'aprobada' && !data.numeroAutorizacion) return false;
  return true;
}, {
  message: "El número de autorización es requerido cuando el estado es 'aprobada'",
  path: ["numeroAutorizacion"]
});