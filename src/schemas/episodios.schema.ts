import { z } from 'zod';

export const createEpisodioSchema = z.object({
  personaId: z.number().int().positive(),
  profesionalId: z.number().int().positive(),
  motivo: z.string().min(5, 'El motivo de apertura es obligatorio'),
  tipo: z.enum(['CONSULTA_EXTERNA', 'URGENCIAS', 'HOSPITALIZACION', 'CONTROL']),
  estado: z.enum(['abierto', 'cerrado', 'cancelado']).optional().default('abierto'),
});