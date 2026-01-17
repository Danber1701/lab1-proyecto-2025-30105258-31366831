import { z } from 'zod';

export const createProfesionalSchema = z.object({
  nombres: z.string().min(2, 'El nombre es obligatorio'),
  apellidos: z.string().min(2, 'El apellido es obligatorio'),
  registroProfesional: z.string().min(5, 'El registro profesional es obligatorio'),
  especialidad: z.string().min(3, 'La especialidad es obligatoria'),
  correo: z.string().email('Email inválido'),
  telefono: z.string().min(7, 'Teléfono inválido'),
  agendaHabilitada: z.boolean().optional().default(true),
});