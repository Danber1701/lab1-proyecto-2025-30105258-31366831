import { Router } from 'express';
import * as profesionalCtrl from '../controllers/profesionales.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createProfesionalSchema } from '../schemas/profesionales.schema';

const router = Router();

router.use(authenticate); // Todas requieren login

router.get('/', profesionalCtrl.getProfesionales);
router.post('/', validate(createProfesionalSchema), profesionalCtrl.createProfesional);

export default router;