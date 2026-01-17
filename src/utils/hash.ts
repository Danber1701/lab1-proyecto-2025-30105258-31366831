import bcrypt from 'bcrypt';
import config from '../config/env';

/**
 * Encripta una cadena de texto (password) usando Bcrypt
 * @param plainText Texto en claro a encriptar
 * @returns Promesa con el hash generado
 */
export const hashData = async (plainText: string): Promise<string> => {
  return await bcrypt.hash(plainText, config.bcryptSaltRounds);
};

/**
 * Compara un texto en claro con un hash para verificar si coinciden
 * @param plainText Texto enviado por el usuario (ej: en login)
 * @param hash Hash almacenado en la base de datos
 * @returns Promesa con valor booleano (true si coinciden)
 */
export const compareData = async (plainText: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(plainText, hash);
};