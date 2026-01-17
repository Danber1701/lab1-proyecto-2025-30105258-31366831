import { Router } from 'express';
import * as resCtrl from '../controllers/resultados.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createResultadoSchema } from '../schemas/resultados.schema';

const router = Router();

router.use(authenticate);

router.post('/', validate(createResultadoSchema), resCtrl.createResultado);
router.get('/orden/:ordenId', resCtrl.getResultadosByOrden);

export default router;