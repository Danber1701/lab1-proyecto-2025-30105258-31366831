import { Router } from 'express';
import * as prescripCtrl from '../controllers/prescripciones.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createPrescripcionSchema } from '../schemas/prescripciones.schema';

const router = Router();

router.use(authenticate);

router.post('/', validate(createPrescripcionSchema), prescripCtrl.createPrescripcion);
router.get('/episodio/:episodioId', prescripCtrl.getPrescripciones);

export default router;