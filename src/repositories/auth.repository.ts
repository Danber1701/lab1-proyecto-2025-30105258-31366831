import prisma from '../config/database';
import { Prisma } from '@prisma/client';

/**
 * Fragmento reutilizable para incluir roles y permisos en las consultas de usuario.
 * Esto garantiza que siempre tengamos la estructura necesaria para el RBAC.
 */
const userInclude = {
  roles: {
    include: {
      rol: {
        include: {
          permisos: true // Incluimos permisos para futuras validaciones de RBAC
        }
      }
    }
  }
} satisfies Prisma.UsuarioInclude;

/**
 * Busca un usuario por su ID único. 
 * Fundamental para el funcionamiento del Refresh Token.
 */
export const findUserById = async (id: number) => {
  return await prisma.usuario.findUnique({
    where: { id },
    include: userInclude
  });
};

/**
 * Busca un usuario por su correo electrónico.
 */
export const findUserByEmail = async (email: string) => {
  return await prisma.usuario.findUnique({
    where: { email },
    include: userInclude
  });
};

/**
 * Busca un usuario por su nombre de usuario (username).
 */
export const findUserByUsername = async (username: string) => {
  return await prisma.usuario.findUnique({
    where: { username },
    include: userInclude
  });
};

/**
 * Crea un nuevo registro de usuario en la base de datos.
 * @param data Objeto con los datos del usuario (username, email, passwordHash)
 */
export const createUser = async (data: Prisma.UsuarioCreateInput) => {
  return await prisma.usuario.create({
    data,
    include: userInclude
  });
};