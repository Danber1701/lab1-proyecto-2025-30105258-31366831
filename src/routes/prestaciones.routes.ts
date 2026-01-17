import { Router } from 'express';
import * as prestCtrl from '../controllers/prestaciones.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createPrestacionSchema } from '../schemas/prestaciones.schema';

const router = Router();

router.use(authenticate);

router.get('/', prestCtrl.getPrestaciones);
router.post('/', validate(createPrestacionSchema), prestCtrl.createPrestacion);

export default router;