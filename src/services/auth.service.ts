import * as authRepository from '../repositories/auth.repository';
import { hashData, compareData } from '../utils/hash';
import { generateToken, verifyToken } from '../config/jwt';
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
  const user = await authRepository.findUserByUsername(credentials.username);
  
  if (!user || !(await compareData(credentials.password, user.passwordHash))) {
    throw new UnauthorizedError('Credenciales incorrectas');
  }

  const rolesArray = user.roles.map((ur: any) => ur.rol.nombre);

  // Generamos el Access Token (Corta duración, ej: 1h)
  const accessToken = generateToken({ 
    id: user.id, 
    email: user.email, 
    roles: rolesArray 
  }, '1h');

  // Generamos el Refresh Token (Larga duración, ej: 7d)
  const refreshToken = generateToken({ 
    id: user.id 
  }, '7d');

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: rolesArray
    },
    token: accessToken,
    refreshToken: refreshToken // Añadimos esto para el Swagger
  };
};

export const refresh = async (token: string) => {
  try {
    const decoded = verifyToken(token) as any;
    const user = await authRepository.findUserById(decoded.id); // Necesitaremos esta función en el repo

    if (!user) throw new UnauthorizedError('Usuario no encontrado');

    const rolesArray = user.roles.map((ur: any) => ur.rol.nombre);
    
    const newAccessToken = generateToken({ 
      id: user.id, 
      email: user.email, 
      roles: rolesArray 
    }, '1h');

    return { token: newAccessToken };
  } catch (error) {
    throw new UnauthorizedError('Refresh token inválido o expirado');
  }
};