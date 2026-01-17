import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    
    // Extraemos el passwordHash para no enviarlo en la respuesta
    const { passwordHash, ...userWithoutPassword } = user;
    
    res.status(201).json({
      status: 'success',
      data: userWithoutPassword
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Error al registrar usuario'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await userService.login(req.body);
    
    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error: any) {
    // Usamos 401 (Unauthorized) para errores de login
    res.status(401).json({
      status: 'error',
      message: error.message || 'Error al iniciar sesión'
    });
  }
};