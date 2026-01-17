import prisma from '../config/database';

interface EnviarNotificacionDTO {
  tipo: 'EMAIL' | 'SMS' | 'PUSH';
  plantilla: string;
  destinatario: string;
  payload: object;
}

export const enviarYRegistrar = async (data: EnviarNotificacionDTO) => {
  // 1. Lógica de envío (Aquí integrarías SendGrid, AWS SES, Twilio, etc.)
  console.log(`Enviando ${data.tipo} a ${data.destinatario}...`);
  
  let estadoEnvio = 'enviado';
  
  // 2. Persistir en la base de datos (según tu modelo Notificacion)
  return await prisma.notificacion.create({
    data: {
      tipo: data.tipo,
      plantilla: data.plantilla,
      destinatario: data.destinatario,
      payload: JSON.stringify(data.payload),
      estado: estadoEnvio,
      timestamp: new Date()
    }
  });
};

export const listarHistorial = async (destinatario?: string) => {
  return await prisma.notificacion.findMany({
    where: destinatario ? { destinatario } : {},
    orderBy: { timestamp: 'desc' }
  });
};