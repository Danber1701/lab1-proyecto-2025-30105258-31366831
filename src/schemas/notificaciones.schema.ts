import { z } from 'zod';

export const enviarNotificacionSchema = z.object({
  tipo: z.enum(['EMAIL', 'SMS', 'PUSH']),
  plantilla: z.string().min(1, 'La plantilla es requerida'),
  destinatario: z.string().min(1, 'El destinatario es requerido'),
  payload: z.object({}).passthrough() // Acepta cualquier objeto interno
});