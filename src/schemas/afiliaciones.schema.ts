import { z } from 'zod';

export const createAfiliacionSchema = z.object({
  personaId: z.number().int().positive(),
  planId: z.number().int().positive(),
  numeroPoliza: z.string().min(3, 'El número de póliza es obligatorio'),
  vigenteDesde: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de inicio de vigencia inválida",
  }),
  vigenteHasta: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de fin de vigencia inválida",
  }),
  copago: z.number().min(0, 'El copago no puede ser negativo'),
  cuotaModeradora: z.number().min(0, 'La cuota moderadora no puede ser negativa'),
  estado: z.enum(['activa', 'inactiva', 'vencida']).optional().default('activa'),
});