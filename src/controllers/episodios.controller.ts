import { Request, Response, NextFunction } from 'express';
import * as episodiosService from '../services/episodios.service';
import { sendSuccess } from '../utils/response';

export const getEpisodios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const episodios = await episodiosService.listarEpisodios(req.query);
    return sendSuccess(res, { data: episodios });
  } catch (error) {
    next(error);
  }
};

export const getEpisodioById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const episodio = await episodiosService.obtenerDetalleEpisodio(Number(req.params.id));
    return sendSuccess(res, { data: episodio });
  } catch (error) {
    next(error);
  }
};

export const createEpisodio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevo = await episodiosService.abrirEpisodio(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Episodio de atención abierto exitosamente',
      data: nuevo
    });
  } catch (error) {
    next(error);
  }
};

export const cerrarEpisodio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const actualizado = await episodiosService.cerrarEpisodio(Number(req.params.id));
    return sendSuccess(res, {
      message: 'Episodio cerrado correctamente',
      data: actualizado
    });
  } catch (error) {
    next(error);
  }
};