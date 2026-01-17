import prisma from '../config/database';

export const findUserByEmail = async (email: string) => {
  return await prisma.usuario.findUnique({
    where: { email },
    include: {
      roles: {
        include: {
          rol: true
        }
      }
    }
  });
};

export const findUserByUsername = async (username: string) => {
  return await prisma.usuario.findUnique({
    where: { username },
    include: {
      roles: {
        include: {
          rol: true
        }
      }
    }
  });
};

export const createUser = async (data: any) => {
  return await prisma.usuario.create({
    data,
    include: {
      roles: {
        include: {
          rol: true
        }
      }
    }
  });
};