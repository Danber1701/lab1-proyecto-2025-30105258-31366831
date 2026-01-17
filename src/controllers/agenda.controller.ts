import { Request, Response, NextFunction } from 'express';
import * as agendaService from '../services/agenda.service';
import { sendSuccess } from '../utils/response';

export const getAgendas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Captura filtros como ?profesionalId=1 o ?inicio=2026-01-01
    const agendas = await agendaService.listarAgendas(req.query);
    return sendSuccess(res, { data: agendas });
  } catch (error) {
    next(error);
  }
};

export const createAgenda = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevaAgenda = await agendaService.registrarAgenda(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Agenda creada y publicada exitosamente',
      data: nuevaAgenda
    });
  } catch (error) {
    next(error);
  }
};

export const patchEstadoAgenda = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const actualizada = await agendaService.actualizarEstado(Number(id), estado);
    return sendSuccess(res, { message: 'Estado de agenda actualizado', data: actualizada });
  } catch (error) {
    next(error);
  }
};