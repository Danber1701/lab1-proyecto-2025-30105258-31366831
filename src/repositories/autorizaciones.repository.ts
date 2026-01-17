import prisma from '../config/database';

export const create = async (data: any) => {
  return await (prisma as any).autorizacion.create({
    data: {
      ordenId: data.ordenId,
      procedimientoCod: data.procedimientoCodigo,
      planId: data.planId,
      observaciones: data.observaciones,
      estado: 'solicitada',
      fechaSolicitud: new Date()
    }
  });
};

export const update = async (id: number, data: any) => {
  // Verificación extra de seguridad
  const idToUpdate = Number(id);
  
  return await (prisma as any).autorizacion.update({
    where: { 
      id: idToUpdate // Asegúrate de que no haya llaves extra ni nombres distintos
    },
    data: {
      estado: data.estado,
      numeroAutorizacion: data.numeroAutorizacion,
      observaciones: data.observaciones,
      fechaRespuesta: data.estado !== 'solicitada' ? new Date() : null
    }
  });
};