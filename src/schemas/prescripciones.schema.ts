import { z } from 'zod';

const itemSchema = z.object({
  medicamentoCodigo: z.string().min(1, "El código es requerido"),
  nombre: z.string().min(1, "El nombre del medicamento es requerido"),
  dosis: z.string().min(1, "La dosis es requerida"),
  via: z.string().min(1, "La vía de administración es requerida"),
  frecuencia: z.string().min(1, "La frecuencia es requerida"),
  duracion: z.string().min(1, "La duración es requerida")
});

export const createPrescripcionSchema = z.object({
  episodioId: z.number().int().positive(),
  observaciones: z.string().optional(),
  items: z.array(itemSchema).min(1, "Debe incluir al menos un medicamento")
});