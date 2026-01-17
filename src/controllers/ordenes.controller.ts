import { Request, Response, NextFunction } from 'express';
import * as ordenesService from '../services/ordenes.service';
import { sendSuccess } from '../utils/response';

export const createOrden = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevaOrden = await ordenesService.generarOrden(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Orden médica generada correctamente',
      data: nuevaOrden
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdenesByEpisodio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { episodioId } = req.params;
    const ordenes = await ordenesService.listarPorEpisodio(Number(episodioId));
    return sendSuccess(res, { data: ordenes });
  } catch (error) {
    next(error);
  }
};