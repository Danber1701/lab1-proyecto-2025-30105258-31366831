import { Response } from 'express';

/**
 * Estructura estándar para todas las respuestas de la API
 */
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

/**
 * Envía una respuesta de éxito (2xx)
 */
export const sendSuccess = <T>(
  res: Response,
  {
    status = 200,
    message = 'Operación exitosa',
    data,
    meta,
  }: {
    status?: number;
    message?: string;
    data?: T;
    meta?: any;
  }
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };
  return res.status(status).json(response);
};

/**
 * Envía una respuesta de error (4xx, 5xx)
 */
export const sendError = (
  res: Response,
  {
    status = 500,
    message = 'Ha ocurrido un error inesperado',
    errors,
  }: {
    status?: number;
    message?: string;
    errors?: any;
  }
): Response => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    errors,
  };
  return res.status(status).json(response);
};