import { Request, Response, NextFunction } from 'express';
import * as unidadesService from '../services/unidades.service';
import { sendSuccess } from '../utils/response';

export const getUnidades = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const unidades = await unidadesService.listarUnidades();
    return sendSuccess(res, { data: unidades });
  } catch (error) {
    next(error);
  }
};

export const createUnidad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevaUnidad = await unidadesService.registrarUnidad(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Unidad de atención creada exitosamente',
      data: nuevaUnidad
    });
  } catch (error) {
    next(error);
  }
};