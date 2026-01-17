import { Request, Response, NextFunction } from 'express';
import * as resultadosService from '../services/resultados.service';
import { sendSuccess } from '../utils/response';

export const createResultado = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevo = await resultadosService.registrarResultado(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Resultado registrado y orden actualizada',
      data: nuevo
    });
  } catch (error) {
    next(error);
  }
};

export const getResultadosByOrden = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ordenId } = req.params;
    const lista = await resultadosService.listarPorOrden(Number(ordenId));
    return sendSuccess(res, { data: lista });
  } catch (error) {
    next(error);
  }
};