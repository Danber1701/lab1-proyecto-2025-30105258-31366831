import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario es requerido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const registerSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario es muy corto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe ser más fuerte'),
});