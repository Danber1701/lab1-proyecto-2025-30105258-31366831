import { Router } from 'express';
import * as pagosCtrl from '../controllers/pagos.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { registrarPagoSchema } from '../schemas/pagos.schema';

const router = Router();

router.use(authenticate);

// Registrar un nuevo pago
router.post('/', validate(registrarPagoSchema), pagosCtrl.createPago);

// Obtener historial de pagos de una factura específica
router.get('/factura/:facturaId', pagosCtrl.getHistorial);

// Reporte de cierre de caja (solo para administradores idealmente)
router.get('/cierre-caja', pagosCtrl.getCierreCaja);

export default router;