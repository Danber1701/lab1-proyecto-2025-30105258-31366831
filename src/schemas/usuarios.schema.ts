import { z } from 'zod';

export const createUsuarioSchema = z.object({
  username: z.string().min(3).max(100),
  email: z.string().email().max(255),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  nombres: z.string().optional(),
  apellidos: z.string().optional(),
  roles: z.array(z.number().int()).min(1, 'Debe asignar al menos un rol'), // IDs de los roles
});

export const updateEstadoSchema = z.object({
  estado: z.enum(['activo', 'inactivo']),
});