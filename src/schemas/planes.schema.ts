import { z } from 'zod';

export const createPlanSchema = z.object({
  aseguradoraId: z.number().int().positive('ID de aseguradora inválido'),
  nombre: z.string().min(3, 'El nombre del plan es obligatorio'),
  condicionesGenerales: z.string().optional().or(z.literal('')),
  estado: z.enum(['activo', 'inactivo']).optional().default('activo'),
});