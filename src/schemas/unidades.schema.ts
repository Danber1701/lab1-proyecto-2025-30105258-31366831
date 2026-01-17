import { z } from 'zod';

export const createUnidadSchema = z.object({
  nombre: z.string().min(3, 'El nombre de la unidad es obligatorio'),
  tipo: z.string().min(3, 'El tipo de unidad (ej. Consultorio, Quirófano) es obligatorio'),
  direccion: z.string().min(5, 'La dirección es obligatoria'),
  telefono: z.string().min(7, 'El teléfono es obligatorio'),
  horarioReferencia: z.string().optional().or(z.literal('')),
});