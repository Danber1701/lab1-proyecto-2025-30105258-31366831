import jwt from 'jsonwebtoken';
import config from './env';
import { JwtPayload } from '../types/index';

/**
 * Genera un token JWT.
 * He añadido el parámetro opcional 'expiresIn' para que puedas definir 
 * tiempos distintos (ej: '1h' para acceso, '7d' para refresh).
 * Si no se pasa, usará el valor por defecto de tu configuración global.
 */
export const generateToken = (payload: JwtPayload, expiresIn: string | number = config.jwtExpiresIn): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn,
  });
};

/**
 * Verifica la validez de un token JWT.
 * Retorna el payload decodificado o null si el token es inválido/expirado.
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as JwtPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Decodifica un token sin verificar su firma.
 */
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};