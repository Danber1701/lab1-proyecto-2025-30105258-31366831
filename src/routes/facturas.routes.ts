import { Router } from 'express';
import * as factCtrl from '../controllers/facturas.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { checkPermission } from '../middlewares/rbac.middleware'; // Importado
import { createFacturaSchema } from '../schemas/facturas.schema';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

/**
 * Emisión de factura
 * Requiere permiso de creación de facturas
 */
router.post(
  '/', 
  checkPermission('FACTURACION_CREAR'), // Protección de seguridad
  validate(createFacturaSchema), 
  factCtrl.createFactura
);

// Obtener detalles de una factura
router.get('/:id', factCtrl.getFacturaById); 

export default router;