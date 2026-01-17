import bcrypt from 'bcrypt';
import prisma from '../config/database';
import config from '../config/env';
import { generateToken } from '../config/jwt';

/**
 * Crea un nuevo usuario con la contraseña encriptada
 */
export const createUser = async (userData: any) => {
  const hashedPassword = await bcrypt.hash(userData.password, config.bcryptSaltRounds);

  return await prisma.usuario.create({
    data: {
      username: userData.username,
      email: userData.email,
      passwordHash: hashedPassword,
      estado: 'activo'
    }
  });
};

/**
 * Valida credenciales y genera un token JWT
 */
export const login = async (credentials: { email: string; password: string }) => {
  // 1. Buscar usuario
  const user = await prisma.usuario.findUnique({ 
    where: { email: credentials.email } 
  });

  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  // 2. Verificar contraseña
  const isMatch = await bcrypt.compare(credentials.password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Credenciales incorrectas');
  }

  // 3. Generar Token
  const token = generateToken({ 
    id: user.id, 
    email: user.email 
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
    token
  };
};