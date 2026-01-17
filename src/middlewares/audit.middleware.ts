import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const auditLogger = async (req: Request, res: Response, next: NextFunction) => {
  // Obtenemos el usuario del token (inyectado por authMiddleware)
  const userId = (req as any).user?.id;
  
  // Escuchamos cuando la respuesta ha terminado de enviarse al cliente
  res.on('finish', async () => {
    // REGLA: Solo auditamos si hay un usuario identificado 
    // y si la respuesta fue exitosa (evitamos saturar con errores 404 o 400 innecesarios)
    if (userId && res.statusCode >= 200 && res.statusCode < 400) {
      try {
        await prisma.bitacoraAccesos.create({
          data: {
            usuarioId: userId,
            recurso: req.originalUrl,
            accion: req.method,
            ip: req.ip || req.socket.remoteAddress || 'unknown',
            userAgent: req.get('user-agent') || 'unknown',
            fecha: new Date()
          },
        });
      } catch (error) {
        // Usamos console.error pero no bloqueamos la respuesta del usuario
        console.error('Critico: Error guardando bitácora de auditoría:', error);
      }
    }
  });

  next();
};