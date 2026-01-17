import { Request, Response, NextFunction } from 'express';
import * as personaService from '../services/personas.service';
import { sendSuccess } from '../utils/response';

export const getPersonas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const personas = await personaService.listarPersonas();
    return sendSuccess(res, { data: personas });
  } catch (error) {
    next(error);
  }
};

export const getArchivedPersonas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const personas = await personaService.listarArchivados();
    return sendSuccess(res, { data: personas });
  } catch (error) {
    next(error);
  }
};

export const createPersona = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevaPersona = await personaService.registrarPersona(req.body);
    return sendSuccess(res, { 
      status: 201, 
      message: 'Persona registrada exitosamente', 
      data: nuevaPersona 
    });
  } catch (error) {
    next(error);
  }
};

export const deletePersona = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await personaService.eliminarPersona(Number(id));
    return sendSuccess(res, { message: 'Persona desactivada exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const restorePersona = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const restaurada = await personaService.restaurarPersona(Number(id));
    return sendSuccess(res, { 
      message: 'Persona restaurada exitosamente', 
      data: restaurada 
    });
  } catch (error) {
    next(error);
  }
};