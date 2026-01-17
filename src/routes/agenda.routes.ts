import { Router } from 'express';
import * as agendaCtrl from '../controllers/agenda.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createAgendaSchema } from '../schemas/agenda.schema';

const router = Router();

// Todas las rutas de agenda requieren autenticación
router.use(authenticate);

/**
 * GET /api/agenda
 * Obtiene el listado de agendas con soporte para filtros por profesional, unidad y fechas.
 */
router.get('/', agendaCtrl.getAgendas);

/**
 * POST /api/agenda
 * Crea un nuevo bloque de agenda validando solapamientos y habilitación del profesional.
 */
router.post('/', validate(createAgendaSchema), agendaCtrl.createAgenda);

/**
 * PATCH /api/agenda/:id/estado
 * Permite abrir, cerrar o reservar un bloque de agenda específico.
 * Requisito funcional 2.2: "estado (abierto, cerrado, reservado)".
 */
router.patch('/:id/estado', agendaCtrl.patchEstadoAgenda);

export default router;