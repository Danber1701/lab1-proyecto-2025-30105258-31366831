import { Router } from 'express';
import * as citasCtrl from '../controllers/citas.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createCitaSchema } from '../schemas/citas.schema';

const router = Router();

router.use(authenticate);

router.get('/', citasCtrl.getCitas);
router.post('/', validate(createCitaSchema), citasCtrl.createCita);
// Nueva ruta para cumplir con el requisito de actualización de estados
router.patch('/:id/estado', citasCtrl.updateEstadoCita);

export default router;