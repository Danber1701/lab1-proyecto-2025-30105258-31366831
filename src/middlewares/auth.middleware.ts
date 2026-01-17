import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import logger from '../utils/logger';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn(`Acceso denegado: Token faltante en ${req.originalUrl}`);
    return res.status(401).json({ 
      success: false, 
      message: 'No autorizado, se requiere un token de acceso' 
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded || !decoded.id) {
    logger.warn(`Acceso denegado: Token inválido o corrupto desde IP ${req.ip}`);
    return res.status(401).json({ 
      success: false, 
      message: 'Token inválido o expirado' 
    });
  }

  // Seteamos el usuario para que esté disponible en los controladores y en la Auditoría
  (req as any).user = decoded;
  
  next();
};