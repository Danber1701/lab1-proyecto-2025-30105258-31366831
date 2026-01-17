import { z } from 'zod';

export const createResultadoSchema = z.object({
  // Validamos que el ID sea un número entero y positivo
  ordenId: z.number({
    required_error: "El ID de la orden es obligatorio",
    invalid_type_error: "El ID de la orden debe ser un número"
  }).int().positive(),

  // El resumen debe tener una longitud mínima para ser clínicamente útil
  resumen: z.string({
    required_error: "El resumen del resultado es obligatorio"
  }).min(10, 'El resumen debe ser más descriptivo (mínimo 10 caracteres)'),

  // El archivoId es opcional (por si solo suben texto), pero si viene, debe ser string
  archivoId: z.string().nullable().optional(),
});

// Tipado para TypeScript basado en el esquema de Zod
export type CreateResultadoInput = z.infer<typeof createResultadoSchema>;