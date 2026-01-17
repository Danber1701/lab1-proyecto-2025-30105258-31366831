import { Request, Response, NextFunction } from 'express';
import * as planesService from '../services/planes.service';
import { sendSuccess } from '../utils/response';

export const getPlanes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lista = await planesService.listarPlanes();
    return sendSuccess(res, { data: lista });
  } catch (error) {
    next(error);
  }
};

export const createPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevo = await planesService.registrarPlan(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Plan de cobertura creado exitosamente',
      data: nuevo
    });
  } catch (error) {
    next(error);
  }
};