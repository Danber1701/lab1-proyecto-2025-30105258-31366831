import { Request, Response, NextFunction } from 'express';
import * as autoService from '../services/autorizaciones.service';
import { sendSuccess } from '../utils/response';
import { BadRequestError } from '../utils/errors';

export const solicitar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nueva = await autoService.solicitarAutorizacion(req.body);
    return sendSuccess(res, { 
      status: 201, 
      data: nueva, 
      message: 'Solicitud de autorización creada correctamente' 
    });
  } catch (error) {
    next(error);
  }
};

export const responder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const idNumerico = Number(id);

    if (isNaN(idNumerico)) {
      throw new BadRequestError('El ID de la autorización debe ser un número válido');
    }

    const actualizada = await autoService.procesarRespuestaAseguradora(idNumerico, req.body);
    
    return sendSuccess(res, { 
      data: actualizada, 
      message: 'Respuesta de aseguradora procesada con éxito' 
    });
  } catch (error) {
    next(error);
  }
};