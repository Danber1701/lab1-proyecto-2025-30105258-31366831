import rateLimit from 'express-rate-limit';

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Bloquea tras 5 intentos fallidos
  message: {
    success: false,
    message: 'Demasiados intentos de inicio de sesión. Intente más tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});