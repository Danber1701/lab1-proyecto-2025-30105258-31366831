import { Request, Response, NextFunction } from 'express';
import * as diagnosticoService from '../services/diagnosticos.service';
import { sendSuccess } from '../utils/response';

export const createDiagnostico = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevo = await diagnosticoService.registrarDiagnostico(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Diagnóstico registrado exitosamente',
      data: nuevo
    });
  } catch (error) {
    next(error);
  }
};

export const getDiagnosticos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { episodioId } = req.params;
    const lista = await diagnosticoService.listarPorEpisodio(Number(episodioId));
    return sendSuccess(res, { data: lista });
  } catch (error) {
    next(error);
  }
};