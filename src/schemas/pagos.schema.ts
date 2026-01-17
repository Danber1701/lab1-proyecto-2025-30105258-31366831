import { z } from 'zod';

export const registrarPagoSchema = z.object({
  facturaId: z.number().int().positive(),
  monto: z.number().positive("El monto debe ser mayor a 0"),
  medio: z.enum(['efectivo', 'tarjeta', 'transferencia']),
  referencia: z.string().optional(),
});

export const notaAjusteSchema = z.object({
  facturaId: z.number().int().positive(),
  monto: z.number().positive(),
  motivo: z.string().min(5, "Debe especificar un motivo válido"),
  tipo: z.enum(['CREDITO', 'DEBITO']) // CREDITO resta saldo, DEBITO suma saldo
});