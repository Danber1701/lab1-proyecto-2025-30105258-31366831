import { z } from 'zod';

const itemSchema = z.object({
  prestacionCodigo: z.string().min(1, "El código de prestación es requerido"),
  cantidad: z.number().int().positive("La cantidad debe ser mayor a 0"),
});

export const createFacturaSchema = z.object({
  personaId: z.number().int().positive(),
  aseguradoraId: z.number().int().positive().optional(),
  moneda: z.string().default('COP'),
  items: z.array(itemSchema).min(1, 'La factura debe tener al menos un ítem'),
});

export const createPagoSchema = z.object({
  facturaId: z.number().int().positive(),
  monto: z.number().positive("El monto debe ser un valor positivo"),
  medio: z.enum(['efectivo', 'tarjeta', 'transferencia']),
  referencia: z.string().optional(),
});