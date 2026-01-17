import { z } from 'zod';

export const createCitaSchema = z.object({
  personaId: z.number().int().positive(),
  profesionalId: z.number().int().positive(),
  unidadId: z.number().int().positive(),
  agendaId: z.number().int().positive().optional(),
  inicio: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de inicio inválida",
  }),
  fin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de fin inválida",
  }),
  motivo: z.string().min(5, 'El motivo es obligatorio'),
  canal: z.enum(['PRESENCIAL', 'TELECONSULTA', 'DOMICILIARIA']),
  observaciones: z.string().optional().or(z.literal('')),
});