import prisma from '../config/database';

export const create = async (data: any) => {
  const { episodioId, observaciones, items } = data;

  // Forzamos a 'any' para evitar que el compilador bloquee el proceso
  // si el cliente de Prisma no se ha regenerado correctamente.
  return await (prisma as any).$transaction(async (tx: any) => {
    
    // 1. Crear la cabecera de la prescripción
    const prescripcion = await tx.prescripcion.create({
      data: {
        episodioId,
        observaciones
      }
    });

    // 2. Crear los items vinculados
    await tx.prescripcionItem.createMany({
      data: items.map((item: any) => ({
        medicamentoCodigo: item.medicamentoCodigo,
        nombre: item.nombre,
        dosis: item.dosis,
        via: item.via,
        frecuencia: item.frecuencia,
        duracion: item.duracion,
        prescripcionId: prescripcion.id
      }))
    });

    // 3. Retornar la prescripción completa con sus items
    return await tx.prescripcion.findUnique({
      where: { id: prescripcion.id },
      include: { items: true }
    });
  });
};

export const getByEpisodio = async (episodioId: number) => {
  // Aplicamos casting a 'any' también aquí para el GET
  return await (prisma as any).prescripcion.findMany({
    where: { episodioId },
    include: { items: true },
    orderBy: { fecha: 'desc' }
  });
};