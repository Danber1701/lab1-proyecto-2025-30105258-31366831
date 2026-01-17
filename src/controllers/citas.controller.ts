import { Request, Response, NextFunction } from 'express';
import * as citasService from '../services/citas.service';
import { sendSuccess } from '../utils/response';

/**
 * Obtiene el listado de citas.
 * OPTIMIZACIÓN: Se añaden query params para cumplir con el requisito de 
 * filtrado por persona, profesional, unidad o estado.
 */
export const getCitas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extraemos filtros potenciales de la URL (ej: /citas?estado=solicitada)
    const filtros = {
      personaId: req.query.personaId ? Number(req.query.personaId) : undefined,
      profesionalId: req.query.profesionalId ? Number(req.query.profesionalId) : undefined,
      estado: req.query.estado as string,
      fecha: req.query.fecha as string // Para buscar citas de un día específico
    };

    const citas = await citasService.listarCitas(filtros);
    
    return sendSuccess(res, { 
      message: 'Listado de citas recuperado',
      data: citas 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Registra una nueva cita en el sistema.
 */
export const createCita = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Los datos del cuerpo ya vienen validados por el DTO/Middleware en la ruta
    const nuevaCita = await citasService.agendarCita(req.body);
    
    return sendSuccess(res, {
      status: 201,
      message: 'Cita agendada exitosamente',
      data: nuevaCita
    });
  } catch (error) {
    next(error);
  }
};

/**
 * SUGERENCIA: Agregar un método para actualizar el estado (Confirmar/Cancelar)
 */
export const updateEstadoCita = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { estado, observaciones } = req.body;
    
    const citaActualizada = await citasService.cambiarEstado(Number(id), estado, observaciones);
    
    return sendSuccess(res, {
      message: `Cita actualizada a estado: ${estado}`,
      data: citaActualizada
    });
  } catch (error) {
    next(error);
  }
};