import { Router } from 'express';
import * as planesCtrl from '../controllers/planes.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createPlanSchema } from '../schemas/planes.schema';

const router = Router();

router.use(authenticate);

router.get('/', planesCtrl.getPlanes);
router.post('/', validate(createPlanSchema), planesCtrl.createPlan);

export default router;