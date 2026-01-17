import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import prisma from '../config/database';

export const checkPermission = (permisoRequerido: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.id) {
      return sendError(res, { status: 401, message: 'Usuario no identificado' });
    }

    // Buscamos en la BD si alguno de los roles del usuario tiene el permiso solicitado
    const permisoEncontrado = await prisma.usuarioRol.findFirst({
      where: {
        usuarioId: user.id,
        rol: {
          permisos: {
            some: {
              permiso: {
                clave: permisoRequerido // Ejemplo: 'CREAR_FACTURA'
              }
            }
          }
        }
      }
    });

    if (!permisoEncontrado) {
      return sendError(res, { 
        status: 403, 
        message: `No tienes el permiso necesario: [${permisoRequerido}]` 
      });
    }

    next();
  };
};