import { Router } from 'express';
import * as afiCtrl from '../controllers/afiliaciones.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createAfiliacionSchema } from '../schemas/afiliaciones.schema';

const router = Router();

router.use(authenticate);

router.get('/', afiCtrl.getAfiliaciones);
router.post('/', validate(createAfiliacionSchema), afiCtrl.createAfiliacion);

export default router;