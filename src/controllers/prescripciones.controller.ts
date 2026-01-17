import { Request, Response, NextFunction } from 'express';
import * as prescripService from '../services/prescripciones.service';
import { sendSuccess } from '../utils/response';

export const createPrescripcion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nueva = await prescripService.registrarPrescripcion(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Prescripción médica generada exitosamente',
      data: nueva
    });
  } catch (error) {
    next(error);
  }
};

export const getPrescripciones = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { episodioId } = req.params;
    const lista = await prescripService.listarPorEpisodio(Number(episodioId));
    return sendSuccess(res, { data: lista });
  } catch (error) {
    next(error);
  }
};