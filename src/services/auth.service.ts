import * as authRepository from '../repositories/auth.repository';
import { hashData, compareData } from '../utils/hash';
import { generateToken } from '../config/jwt';
import { BadRequestError, UnauthorizedError } from '../utils/errors';

export const register = async (userData: any) => {
  // Verificamos si el email ya existe
  const existingEmail = await authRepository.findUserByEmail(userData.email);
  if (existingEmail) {
    throw new BadRequestError('El correo electrónico ya está registrado');
  }

  // Verificamos si el username ya existe
  const existingUsername = await authRepository.findUserByUsername(userData.username);
  if (existingUsername) {
    throw new BadRequestError('El nombre de usuario ya está en uso');
  }

  const passwordHash = await hashData(userData.password);
  
  const user = await authRepository.createUser({
    username: userData.username,
    email: userData.email,
    passwordHash,
  });

  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (credentials: any) => {
  // Buscamos al usuario por su username
  const user = await authRepository.findUserByUsername(credentials.username);
  
  if (!user || !(await compareData(credentials.password, user.passwordHash))) {
    throw new UnauthorizedError('Credenciales incorrectas');
  }

  // Mapeamos los roles a un array de strings para el JWT
  const rolesArray = user.roles.map((ur: any) => ur.rol.nombre);

  // Pasamos los roles al token
  const token = generateToken({ 
    id: user.id, 
    email: user.email, 
    roles: rolesArray 
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: rolesArray
    },
    token,
  };
};