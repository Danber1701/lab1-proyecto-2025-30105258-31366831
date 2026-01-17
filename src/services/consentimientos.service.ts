import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';

export const registrar = async (data: any) => {
  // Validar que la persona exista
  const persona = await prisma.personaAtendida.findUnique({
    where: { id: data.personaId }
  });
  if (!persona) throw new NotFoundError('La persona/paciente no existe');

  return await prisma.consentimiento.create({
    data: {
      personaId: data.personaId,
      episodioId: data.episodioId || null,
      tipoProcedimiento: data.tipoProcedimiento,
      metodo: data.metodo, // Ej: 'Firma Digital', 'Huella', 'Físico Escaneado'
      archivoId: data.archivoId || null,
      fecha: new Date()
    },
    include: {
      persona: { select: { nombres: true, apellidos: true } }
    }
  });
};

export const listarPorPersona = async (personaId: number) => {
  return await prisma.consentimiento.findMany({
    where: { personaId },
    orderBy: { fecha: 'desc' }
  });
};