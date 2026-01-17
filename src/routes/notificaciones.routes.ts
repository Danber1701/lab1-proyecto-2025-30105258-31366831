import { Router } from 'express';
import * as notificacionesController from '../controllers/notificaciones.controller';
// Usando los nombres de archivos que confirmaste tener en tu carpeta middlewares
import { validate } from '../middlewares/validation.middleware'; 
import { authenticate } from '../middlewares/auth.middleware'; 
import { enviarNotificacionSchema } from '../schemas/notificaciones.schema';

const router = Router();

/**
 * @route POST /api/notificaciones
 * @desc Enviar una notificación manual y registrarla en auditoría
 * @access Privado (Requiere Auth)
 */
router.post(
  '/', 
  authenticate, 
  validate(enviarNotificacionSchema), 
  notificacionesController.enviarNotificacion
);

/**
 * @route GET /api/notificaciones/historial
 * @desc Obtener el historial de notificaciones enviadas
 * @access Privado (Requiere Auth)
 */
router.get(
  '/historial', 
  authenticate,
  notificacionesController.getHistorial
);

export default router;