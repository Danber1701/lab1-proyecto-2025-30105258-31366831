import { CorsOptions } from 'cors';
import config from './env';

/**
 * Dominios permitidos para interactuar con la API.
 * Aquí debes agregar las URLs de tu Frontend (React, Angular, etc.)
 */
const whiteList = [
  'http://localhost:3000', // Tu servidor de desarrollo
  'http://localhost:5173', // Puerto por defecto de Vite
  'http://localhost:4200', // Puerto por defecto de Angular
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (como Postman o llamadas entre servidores)
    if (!origin) {
      return callback(null, true);
    }

    // En desarrollo, permitimos cualquier origen para facilitar las pruebas
    if (config.nodeEnv === 'development') {
      return callback(null, true);
    }

    // En producción, verificamos contra la lista blanca
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Acceso denegado por políticas de CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // Permite el envío de cookies o cabeceras de autenticación
  credentials: true,
  optionsSuccessStatus: 200,
};