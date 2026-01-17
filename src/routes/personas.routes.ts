import { Router } from 'express';
import * as personaCtrl from '../controllers/personas.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createPersonaSchema } from '../schemas/personas.schema';

const router = Router();

router.use(authenticate);

router.get('/', personaCtrl.getPersonas);
router.get('/archived', personaCtrl.getArchivedPersonas);
router.post('/', validate(createPersonaSchema), personaCtrl.createPersona);
router.patch('/:id/restore', personaCtrl.restorePersona);
router.delete('/:id', personaCtrl.deletePersona);

export default router;