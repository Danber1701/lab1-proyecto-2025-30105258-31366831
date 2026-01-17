import prisma from '../config/database';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../utils/errors';

export const registrarUsuario = async (data: any) => {
  // 1. Verificar si el email o username ya existen
  const existe = await prisma.usuario.findFirst({
    where: { OR: [{ email: data.email }, { username: data.username }] }
  });
  if (existe) throw new BadRequestError('El nombre de usuario o email ya está en uso');

  // 2. Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(data.password, salt);

  // 3. Crear usuario y asignar roles en una transacción
  return await prisma.$transaction(async (tx) => {
    const nuevoUsuario = await tx.usuario.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash,
        roles: {
          create: data.roles.map((rolId: number) => ({
            rol: { connect: { id: rolId } }
          }))
        }
      },
      include: {
        roles: { include: { rol: true } }
      }
    });
    return nuevoUsuario;
  });
};

export const listarUsuarios = async () => {
  return await prisma.usuario.findMany({
    include: { roles: { include: { rol: true } } },
    where: { estado: 'activo' }
  });
};