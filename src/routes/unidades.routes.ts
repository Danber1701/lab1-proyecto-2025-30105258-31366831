import { Router } from 'express';
import * as unidadesCtrl from '../controllers/unidades.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createUnidadSchema } from '../schemas/unidades.schema';

const router = Router();

router.use(authenticate);

router.get('/', unidadesCtrl.getUnidades);
router.post('/', validate(createUnidadSchema), unidadesCtrl.createUnidad);

export default router;