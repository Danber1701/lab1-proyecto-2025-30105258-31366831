import { Request, Response, NextFunction } from 'express';
import * as notasService from '../services/notas-contables.service';
import { sendSuccess } from '../utils/response';
import { registrarAccion } from '../utils/logger';

export const createNota = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const nota = await notasService.registrarNota(req.body);
    
    // Trazabilidad específica
    await registrarAccion(user.id, 'NOTAS_CONTABLES', req.body.tipo, req);

    return sendSuccess(res, { 
      status: 201, 
      message: `Nota de ${req.body.tipo} procesada correctamente`, 
      data: nota 
    });
  } catch (error) {
    next(error);
  }
};