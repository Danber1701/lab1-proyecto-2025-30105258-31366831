import { Router } from 'express';
import * as userCtrl from '../controllers/usuarios.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createUsuarioSchema } from '../schemas/usuarios.schema';

const router = Router();

router.use(authenticate); // Todas las rutas requieren estar logueado

router.get('/', userCtrl.getUsuarios);
router.post('/', validate(createUsuarioSchema), userCtrl.createUsuario);

export default router;