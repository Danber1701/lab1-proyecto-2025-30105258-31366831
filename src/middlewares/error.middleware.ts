import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { sendError } from '../utils/response';
import logger from '../utils/logger';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Si el error es una instancia de nuestro AppError, usamos su status
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Error interno del servidor';

  // Logueamos el error para el equipo de desarrollo
  logger.error(`${req.method} ${req.path} - ${message}`);
  if (statusCode === 500) {
    console.error(err); // Muestra el stack completo solo si es un error no controlado
  }

  return sendError(res, {
    status: statusCode,
    message: message,
    // Enviamos el stack de error solo en desarrollo para debugging
    errors: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};