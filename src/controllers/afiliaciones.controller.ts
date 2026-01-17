import { Request, Response, NextFunction } from 'express';
import * as afiService from '../services/afiliaciones.service';
import { sendSuccess } from '../utils/response';

export const createAfiliacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nueva = await afiService.registrarAfiliacion(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Afiliación registrada correctamente',
      data: nueva
    });
  } catch (error) {
    next(error);
  }
};

export const getAfiliaciones = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lista = await afiService.listarAfiliaciones();
    return sendSuccess(res, { data: lista });
  } catch (error) {
    next(error);
  }
};