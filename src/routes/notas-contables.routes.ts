import { Router } from 'express';
import * as notasCtrl from '../controllers/notas-contables.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createNotaSchema } from '../schemas/notas-contables.schema';

const router = Router();

router.use(authenticate);

// Ruta única para procesar ajustes
router.post('/', validate(createNotaSchema), notasCtrl.createNota);

export default router;