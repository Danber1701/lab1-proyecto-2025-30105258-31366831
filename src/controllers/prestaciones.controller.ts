import { Request, Response, NextFunction } from 'express';
import * as prestacionService from '../services/prestaciones.service';
import { sendSuccess } from '../utils/response';

export const getPrestaciones = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lista = await prestacionService.listarPrestaciones();
    return sendSuccess(res, { data: lista });
  } catch (error) {
    next(error);
  }
};

export const createPrestacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nueva = await prestacionService.registrarPrestacion(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Prestación añadida al catálogo exitosamente',
      data: nueva
    });
  } catch (error) {
    next(error);
  }
};