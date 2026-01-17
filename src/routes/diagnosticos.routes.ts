import { Router } from 'express';
import * as diagCtrl from '../controllers/diagnosticos.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createDiagnosticoSchema } from '../schemas/diagnosticos.schema';

const router = Router();

router.use(authenticate);

router.post('/', validate(createDiagnosticoSchema), diagCtrl.createDiagnostico);
router.get('/episodio/:episodioId', diagCtrl.getDiagnosticos);

export default router;