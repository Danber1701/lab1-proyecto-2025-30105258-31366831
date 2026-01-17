import { Router } from 'express';
import * as consentimientosController from '../controllers/consentimientos.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Usamos upload.single('pdf') indicando que el campo en Postman se llamará 'pdf'
router.post(
  '/', 
  authenticate, 
  upload.single('pdf'), 
  consentimientosController.createConsentimiento
);

router.get('/persona/:personaId', authenticate, consentimientosController.getPorPersona);

export default router;