import { Request, Response, NextFunction } from 'express';
import * as notificacionesService from '../services/notificaciones.service';
import { sendSuccess } from '../utils/response';
import { registrarAccion } from '../utils/logger';

export const enviarNotificacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    
    const notificacion = await notificacionesService.enviarYRegistrar(req.body);

    // Auditoría de quién disparó la notificación
    if (user) {
      await registrarAccion(user.id, 'NOTIFICACIONES', 'SEND', req);
    }

    return sendSuccess(res, {
      status: 201,
      message: 'Notificación procesada y registrada',
      data: notificacion
    });
  } catch (error) {
    next(error);
  }
};

export const getHistorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.query;
    const historial = await notificacionesService.listarHistorial(email as string);
    return sendSuccess(res, { data: historial });
  } catch (error) {
    next(error);
  }
};