import { Request, Response, NextFunction } from 'express';
import * as arancelService from '../services/aranceles.service';
import { sendSuccess } from '../utils/response';

export const getAranceles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lista = await arancelService.listarAranceles();
    return sendSuccess(res, { data: lista });
  } catch (error) {
    next(error);
  }
};

export const createArancel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevo = await arancelService.registrarArancel(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Arancel creado exitosamente',
      data: nuevo
    });
  } catch (error) {
    next(error);
  }
};