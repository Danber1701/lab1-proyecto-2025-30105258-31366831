import prisma from '../config/database';

// --- LOGAR DE APLICACIÓN (Tu código original mantenido) ---
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logger = {
  error: (message: string) => console.error(`[ERROR] ${new Date().toISOString()}: ${message}`),
  warn: (message: string) => console.warn(`[WARN] ${new Date().toISOString()}: ${message}`),
  info: (message: string) => console.info(`[INFO] ${new Date().toISOString()}: ${message}`),
  debug: (message: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`);
    }
  },
};

// --- AUDITOR DE BASE DE DATOS (Bitácora de Accesos) ---
// Esta es la nueva función que guarda en la tabla de la base de datos
export const registrarAccion = async (usuarioId: number, recurso: string, accion: string, req: any) => {
  try {
    await prisma.bitacoraAccesos.create({
      data: {
        usuarioId,
        recurso,
        accion,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent') || 'Desconocido'
      }
    });
  } catch (err) {
    // Si falla la bitácora, lo logueamos en la consola para no detener la app
    logger.error(`No se pudo guardar en la bitácora: ${err}`);
  }
};

export default logger;