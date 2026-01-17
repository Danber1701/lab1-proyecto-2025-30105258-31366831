import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod'; // Cambiado AnyZodObject por ZodSchema
import { sendError } from '../utils/response';

/**
 * Middleware genérico para validar el cuerpo de la petición (req.body)
 * @param schema - Puede ser un ZodObject simple o un ZodEffects (con .refine)
 */
export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // parseAsync es ideal porque permite validaciones externas o complejas
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendError(res, {
          status: 400,
          message: 'Error de validación de datos',
          errors: error.errors.map((e) => ({
            // Mapea la ruta del error (ej. "items.0.codigo") a un string legible
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      // Si el error no es de Zod, lo enviamos al middleware global de errores
      next(error);
    }
  };
};