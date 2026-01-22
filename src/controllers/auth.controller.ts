import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { sendSuccess } from '../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.register(req.body);
    return sendSuccess(res, {
      status: 201,
      message: 'Usuario registrado exitosamente',
      data: user,
    });
  } catch (error) {
    next(error); // El errorMiddleware lo atrapará
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);
    return sendSuccess(res, {
      message: 'Login exitoso',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error('Refresh token es requerido');
    
    const result = await authService.refresh(refreshToken);
    return sendSuccess(res, {
      message: 'Token refrescado exitosamente',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};