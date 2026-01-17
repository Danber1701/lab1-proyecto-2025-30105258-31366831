import { Request, Response, NextFunction } from 'express';
import * as consentimientosService from '../services/consentimientos.service';
import { sendSuccess } from '../utils/response';

/**
 * Registra un nuevo consentimiento informado junto con su evidencia digital.
 */
export const createConsentimiento = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /**
     * OPTIMIZACIÓN: Normalización de la ruta del archivo.
     * Multer en Windows usa '\', pero las URLs requieren '/'.
     * También validamos si el archivo existe antes de procesar la ruta.
     */
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const archivoPath = req.file ? req.file.path.replace(/\\/g, '/') : null;

    /**
     * OPTIMIZACIÓN: Tipado de datos.
     * Al usar 'multipart/form-data', todos los campos llegan como string.
     * Convertimos explícitamente a Number los IDs para evitar errores en Prisma.
     */
    const data = {
      personaId: Number(req.body.personaId),
      episodioId: req.body.episodioId ? Number(req.body.episodioId) : null,
      tipoProcedimiento: req.body.tipoProcedimiento,
      metodo: req.body.metodo,
      archivoId: archivoPath 
    };

    const nuevo = await consentimientosService.registrar(data);

    return sendSuccess(res, {
      status: 201,
      message: 'Consentimiento y evidencia documental registrados correctamente',
      data: nuevo
    });
  } catch (error) {
    /**
     * Si ocurre un error aquí, el errorMiddleware se encargará de 
     * devolver la respuesta adecuada (400, 404, etc.)
     */
    next(error);
  }
};

/**
 * Obtiene el historial de consentimientos de un paciente específico.
 */
export const getPorPersona = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { personaId } = req.params;
    
    const lista = await consentimientosService.listarPorPersona(Number(personaId));
    
    return sendSuccess(res, { 
      message: 'Historial de consentimientos recuperado',
      data: lista 
    });
  } catch (error) {
    next(error);
  }
};