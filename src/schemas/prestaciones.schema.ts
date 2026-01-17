// src/schemas/prestaciones.schema.ts
import { z } from 'zod';

export const createPrestacionSchema = z.object({
  codigo: z.string().min(2),
  nombre: z.string().min(5),
  tipo: z.enum(['CONSULTA', 'LABORATORIO', 'IMAGEN', 'PROCEDIMIENTO', 'MEDICAMENTO']).default('CONSULTA'),
  grupo: z.string().min(1),
  requisitos: z.string().optional().nullable(),
  requiereAutorizacion: z.boolean().default(false),
  tiempoEstimado: z.number().int().optional().nullable(),
  estado: z.string().optional().default('activo')
});