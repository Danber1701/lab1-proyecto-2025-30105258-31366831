import multer from 'multer';
import path from 'path';
import { BadRequestError } from '../utils/errors';

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Decidir carpeta según el campo o ruta
    const folder = req.baseUrl.includes('consentimientos') 
      ? 'uploads/consentimientos' 
      : 'uploads/resultados';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // Nombre único: timestamp-nombre-original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro de archivos (solo PDF e Imágenes por seguridad médica)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new BadRequestError('Tipo de archivo no permitido. Solo PDF, JPG y PNG.'));
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite 5MB
});