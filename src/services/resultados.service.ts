import * as resultadosRepo from '../repositories/resultados.repository';
import prisma from '../config/database';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const registrarResultado = async (data: any) => {
  // Usamos transacción para atomicidad
  return await (prisma as any).$transaction(async (tx: any) => {
    // 1. Validar existencia de la orden
    const orden = await tx.orden.findUnique({
      where: { id: data.ordenId }
    });

    if (!orden) throw new NotFoundError('La orden médica no existe');
    if (orden.estado === 'cancelada') throw new BadRequestError('La orden está cancelada');

    // 2. Control de versiones
    const ultimaVersion = await tx.resultado.findFirst({
      where: { ordenId: data.ordenId },
      orderBy: { version: 'desc' }
    });
    
    const nuevaVersion = ultimaVersion ? ultimaVersion.version + 1 : 1;

    // 3. Crear el resultado
    const resultado = await tx.resultado.create({
      data: {
        ordenId: data.ordenId,
        resumen: data.resumen,
        archivoId: data.archivoId,
        version: nuevaVersion,
        fecha: new Date()
      }
    });

    // 4. Actualizar estado de la orden
    await tx.orden.update({
      where: { id: data.ordenId },
      data: { estado: 'completada' }
    });

    return resultado;
  });
};

export const listarPorOrden = async (ordenId: number) => {
  return await resultadosRepo.getByOrden(ordenId);
};