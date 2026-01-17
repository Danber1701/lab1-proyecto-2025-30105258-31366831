import { Router } from 'express';
import * as notasCtrl from '../controllers/notas.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createNotaSchema } from '../schemas/notas.schema';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

/**
 * POST /api/notas
 * Registra una nueva nota clínica o una nueva versión (adenda).
 */
router.post('/', validate(createNotaSchema), notasCtrl.createNota);

/**
 * GET /api/notas/episodio/:episodioId
 * Recupera el historial de notas de un episodio específico.
 * OPTIMIZACIÓN: Se mantiene la estructura que traías pero se asegura 
 * que el controlador maneje la lógica de ordenamiento por versión.
 */
router.get('/episodio/:episodioId', notasCtrl.getNotasPorEpisodio);

/**
 * SUGERENCIA: GET /api/notas/:id
 * Si en el futuro necesitas ver una versión específica de una nota 
 * por su ID único sin traer todo el episodio.
 */
// router.get('/:id', notasCtrl.getNotaById);

export default router;