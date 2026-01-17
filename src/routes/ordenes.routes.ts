import { Router } from 'express';
import * as ordenesCtrl from '../controllers/ordenes.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createOrdenSchema } from '../schemas/ordenes.schema';

const router = Router();

router.use(authenticate);

router.post('/', validate(createOrdenSchema), ordenesCtrl.createOrden);
router.get('/episodio/:episodioId', ordenesCtrl.getOrdenesByEpisodio);

export default router;