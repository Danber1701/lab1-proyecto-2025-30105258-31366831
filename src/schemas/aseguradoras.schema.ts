import { z } from 'zod';

export const createAseguradoraSchema = z.object({
  nombre: z.string().min(3, 'El nombre de la aseguradora es obligatorio'),
  nit: z.string().min(5, 'El NIT es obligatorio'),
  contacto: z.string().optional().or(z.literal('')),
  estado: z.enum(['activo', 'inactivo']).optional().default('activo'),
});