import { Request, Response, NextFunction } from 'express';
import * as usuarioService from '../services/usuarios.service';
// Importamos el logger por defecto y la función de bitácora
import logger, { registrarAccion } from '../utils/logger';
import { sendSuccess } from '../utils/response';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';

export const createUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obtenemos el usuario autenticado desde el request
    const currentUser = (req as any).user;

    if (!currentUser) {
      throw new UnauthorizedError('Usuario no autenticado');
    }

    // REGLA DE NEGOCIO: Solo el rol 'admin' puede crear otros usuarios
    const isAdmin = currentUser.roles.some((r: any) => 
      typeof r === 'string' ? r === 'admin' : r.nombre === 'admin'
    );

    if (!isAdmin) {
      logger.warn(`Intento de creación de usuario denegado para: ${currentUser.username}`);
      throw new ForbiddenError('No tiene permisos para crear usuarios');
    }

    // Llamamos al servicio para crear el usuario
    const nuevoUsuario = await usuarioService.registrarUsuario(req.body);

    // REGLA DE NEGOCIO: Registrar en la Bitácora de Accesos
    await registrarAccion(currentUser.id, 'USUARIOS', 'CREATE', req);
    
    // Log en consola para el desarrollador
    logger.info(`Usuario creado exitosamente: ${nuevoUsuario.username} por ${currentUser.username}`);

    return sendSuccess(res, { 
      status: 201, 
      message: 'Usuario creado exitosamente',
      data: nuevoUsuario 
    });
  } catch (error) {
    next(error);
  }
};

export const getUsuarios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    
    // Opcional: Registrar que alguien consultó la lista de usuarios
    const currentUser = (req as any).user;
    if (currentUser) {
      await registrarAccion(currentUser.id, 'USUARIOS', 'READ_ALL', req);
    }

    return sendSuccess(res, { data: usuarios });
  } catch (error) {
    next(error);
  }
};