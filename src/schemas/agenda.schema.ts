import { z } from 'zod';

export const createAgendaSchema = z.object({
  profesionalId: z.number({ required_error: "ID de profesional es requerido" }).int().positive(),
  unidadId: z.number({ required_error: "ID de unidad es requerido" }).int().positive(),
  inicio: z.string({ required_error: "Fecha de inicio es requerida" }).refine(val => !isNaN(Date.parse(val)), "Formato de fecha inválido"),
  fin: z.string({ required_error: "Fecha de fin es requerida" }).refine(val => !isNaN(Date.parse(val)), "Formato de fecha inválido"),
  capacidad: z.number().int().min(1, "La capacidad mínima es 1").optional().default(1),
  estado: z.enum(['abierto', 'cerrado', 'reservado']).optional().default('abierto')
});