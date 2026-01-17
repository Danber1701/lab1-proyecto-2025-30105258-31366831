import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware'; // Importamos el guardia

const router = Router();

// Rutas públicas
router.post('/register', userController.register);
router.post('/login', userController.login);

// Ruta protegida (Para probar que el token funciona)
router.get('/profile', authenticate, (req, res) => {
  res.json({
    message: 'Este es un perfil protegido',
    user: (req as any).user // Aquí verás los datos que guardamos en el token
  });
});

export default router;