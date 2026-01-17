import { z } from 'zod';

export const createNotaSchema = z.object({
  facturaId: z.number().int().positive(),
  monto: z.number().positive("El monto debe ser un valor positivo"),
  motivo: z.string().min(10, "El motivo debe ser descriptivo (mínimo 10 caracteres)"),
  tipo: z.enum(['CREDITO', 'DEBITO'], {
    // Corregido: errorMap en lugar de error_map
    errorMap: () => ({ message: "El tipo debe ser CREDITO o DEBITO" })
  }),
});