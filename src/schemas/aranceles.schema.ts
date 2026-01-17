import { z } from 'zod';

export const createArancelSchema = z.object({
  prestacionCodigo: z.string().min(1, 'El código de prestación es obligatorio'),
  planId: z.number().int().positive().nullable().optional(),
  valorBase: z.number().positive('El valor base debe ser mayor a 0'),
  impuestos: z.number().min(0).default(0),
  vigenteDesde: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de inicio inválida",
  }),
  vigenteHasta: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de fin inválida",
  }),
  estado: z.string().optional().default('vigente'),
});