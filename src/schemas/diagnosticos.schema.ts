import { z } from 'zod';

export const createDiagnosticoSchema = z.object({
  episodioId: z.number().int().positive(),
  // Los códigos CIE-10 suelen ser cortos pero específicos
  codigo: z.string().min(3).max(10).toUpperCase().trim(), 
  descripcion: z.string().min(5, 'La descripción detallada es obligatoria'),
  tipo: z.enum(['PRESUNTIVO', 'DEFINITIVO']),
  principal: z.boolean().optional().default(false),
});