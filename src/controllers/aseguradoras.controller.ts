import { Request, Response, NextFunction } from 'express';
import * as aseguradorasService from '../services/aseguradoras.service';
import { sendSuccess } from '../utils/response';

export const getAseguradoras = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lista = await aseguradorasService.listarAseguradoras();
    return sendSuccess(res, { data: lista });
  } catch (error) {
    next(error);
  }
};

export const createAseguradora = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nueva = await aseguradorasService.registrarAseguradora(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Aseguradora registrada exitosamente',
      data: nueva
    });
  } catch (error) {
    next(error);
  }
};