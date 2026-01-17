import { Request, Response, NextFunction } from 'express';
import * as profesionalService from '../services/profesionales.service';
import { sendSuccess } from '../utils/response';

export const getProfesionales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profesionales = await profesionalService.listarProfesionales();
    return sendSuccess(res, { data: profesionales });
  } catch (error) {
    next(error);
  }
};

export const createProfesional = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevo = await profesionalService.registrarProfesional(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Profesional registrado exitosamente',
      data: nuevo
    });
  } catch (error) {
    next(error);
  }
};