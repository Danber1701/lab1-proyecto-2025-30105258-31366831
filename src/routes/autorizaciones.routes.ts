import { Router } from 'express';
import * as autoCtrl from '../controllers/autorizaciones.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { checkPermission } from '../middlewares/rbac.middleware';
import { 
  createAutorizacionSchema, 
  updateEstadoAutorizacionSchema 
} from '../schemas/autorizaciones.schema';

const router = Router();

router.use(authenticate);

router.post(
  '/solicitar', 
  checkPermission('AUTORIZACIONES_CREAR'),
  validate(createAutorizacionSchema), 
  autoCtrl.solicitar
);

router.patch(
  ('/:id/responder' as any), 
  checkPermission('AUTORIZACIONES_ADMIN'),
  validate(updateEstadoAutorizacionSchema), 
  autoCtrl.responder
);

export default router;