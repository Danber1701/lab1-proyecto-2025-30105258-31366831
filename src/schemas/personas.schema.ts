import { z } from 'zod';

export const createPersonaSchema = z.object({
  tipoDocumento: z.enum(['DNI', 'CEDULA', 'PASAPORTE']), // Coincide con schema.prisma
  numeroDocumento: z.string().min(5, 'Documento demasiado corto'),
  nombres: z.string().min(2, 'El nombre es obligatorio'),
  apellidos: z.string().min(2, 'El apellido es obligatorio'),
  fechaNacimiento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de nacimiento inválida (Use YYYY-MM-DD)",
  }),
  sexo: z.enum(['MASCULINO', 'FEMENINO', 'OTRO']), // Coincide con schema.prisma
  correo: z.string().email('Email inválido').optional().or(z.literal('')),
  telefono: z.string().optional().or(z.literal('')),
  direccion: z.string().optional().or(z.literal('')),
  contactoEmergencia: z.string().optional().or(z.literal('')),
  alergias: z.string().optional().or(z.literal('')),
});