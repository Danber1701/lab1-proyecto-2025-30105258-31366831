import { z } from 'zod';

export const createOrdenSchema = z.object({
  episodioId: z.number().int().positive(),
  tipo: z.enum(['MEDICAMENTOS', 'LABORATORIO', 'IMAGENOLOGIA', 'PROCEDIMIENTO']),
  prioridad: z.enum(['NORMAL', 'URGENTE', 'PRIORITARIA']).default('NORMAL'),
  items: z.array(z.object({
    codigo: z.string().min(1, 'Código de ítem requerido'),
    descripcion: z.string().min(3, 'Descripción de ítem requerida'),
    indicaciones: z.string().optional(),
  })).min(1, 'La orden debe tener al menos un ítem'),
});