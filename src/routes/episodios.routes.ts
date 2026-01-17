import { Router } from 'express';
import * as episodiosCtrl from '../controllers/episodios.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createEpisodioSchema } from '../schemas/episodios.schema';

const router = Router();

router.use(authenticate);

router.get('/', episodiosCtrl.getEpisodios);
router.get('/:id', episodiosCtrl.getEpisodioById);
router.post('/', validate(createEpisodioSchema), episodiosCtrl.createEpisodio);
router.patch('/:id/cerrar', episodiosCtrl.cerrarEpisodio);

export default router;