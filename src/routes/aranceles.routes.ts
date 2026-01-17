import { Router } from 'express';
import * as arancelCtrl from '../controllers/aranceles.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createArancelSchema } from '../schemas/aranceles.schema';

const router = Router();

router.use(authenticate);

router.get('/', arancelCtrl.getAranceles);
router.post('/', validate(createArancelSchema), arancelCtrl.createArancel);

export default router;