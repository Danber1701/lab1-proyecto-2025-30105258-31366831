import { z } from 'zod';

export const createNotaSchema = z.object({
  episodioId: z.number().int().positive('ID de episodio inválido'),
  profesionalId: z.number().int().positive('ID de profesional inválido'),
  // Estructura SOAP requerida
  subjetivo: z.string().min(10, 'El subjetivo debe ser más descriptivo'),
  objetivo: z.string().min(10, 'El objetivo debe ser más descriptivo'),
  analisis: z.string().min(10, 'El análisis debe ser más descriptivo'),
  plan: z.string().min(10, 'El plan debe ser más descriptivo'),
});