import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { loginRateLimit } from '../middlewares/rateLimit.middleware';
import { authenticate } from '../middlewares/auth.middleware'; // Importante importar esto
import { sendSuccess } from '../utils/response';

const router = Router();

// --- Rutas Públicas ---
router.post(
  '/register', 
  validate(registerSchema), 
  authController.register
);

router.post(
  '/login', 
  loginRateLimit, 
  validate(loginSchema), 
  authController.login
);

// --- Rutas Protegidas (Solo accesibles con un Token válido) ---
// Usamos el middleware 'authenticate' antes de la función final
router.get('/profile', authenticate, (req, res) => {
  return sendSuccess(res, {
    message: 'Perfil de usuario obtenido con éxito',
    data: (req as any).user // Aquí verás el ID y Email que vienen dentro del Token
  });
});

export default router;