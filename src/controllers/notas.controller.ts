import { Request, Response, NextFunction } from 'express';
import * as notasService from '../services/notas.service';
import { sendSuccess } from '../utils/response';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';
import { registrarAccion } from '../utils/logger';

export const createNota = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    if (!user) throw new UnauthorizedError('Identidad no verificada');

    // Validación de Roles (RBAC)
    const rolesPermitidos = ['admin', 'profesional'];
    const tieneRol = user.roles?.some((r: any) => 
      rolesPermitidos.includes(typeof r === 'string' ? r : r.nombre)
    );
    if (!tieneRol) throw new ForbiddenError('No tiene permisos para registrar notas clínicas');

    // Priorizamos el profesionalId vinculado al usuario logueado
    const profesionalId = user.profesionalId || req.body.profesionalId;

    const nuevaNota = await notasService.registrarNota({
      ...req.body,
      profesionalId
    });

    // Auditoría obligatoria
    await registrarAccion(user.id, 'NOTAS_CLINICAS', 'CREATE_VERSION_' + nuevaNota.version, req);

    return sendSuccess(res, {
      status: 201,
      message: nuevaNota.version > 1 
        ? `Adenda registrada (Versión ${nuevaNota.version})` 
        : 'Nota clínica inicial registrada',
      data: nuevaNota
    });
  } catch (error) {
    next(error);
  }
};

export const getNotasPorEpisodio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { episodioId } = req.params;
    const notas = await notasService.listarPorEpisodio(Number(episodioId));
    return sendSuccess(res, { data: notas });
  } catch (error) {
    next(error);
  }
};