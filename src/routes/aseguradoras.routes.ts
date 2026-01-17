import { Router } from 'express';
import * as aseguradorasCtrl from '../controllers/aseguradoras.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createAseguradoraSchema } from '../schemas/aseguradoras.schema';

const router = Router();

router.use(authenticate);

router.get('/', aseguradorasCtrl.getAseguradoras);
router.post('/', validate(createAseguradoraSchema), aseguradorasCtrl.createAseguradora);

export default router;