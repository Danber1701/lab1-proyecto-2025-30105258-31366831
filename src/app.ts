import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

// Configuraciones y Middlewares
import { corsOptions } from './config/cors';
import { errorMiddleware } from './middlewares/error.middleware';
import { auditLogger } from './middlewares/audit.middleware';
import { swaggerSpec } from './docs/swagger';
import config from './config/env';

// Importación de Rutas
import authRoutes from './routes/auth.routes';
import personaRoutes from './routes/personas.routes';
import profesionalRoutes from './routes/profesionales.routes';
import unidadesRoutes from './routes/unidades.routes';
import agendaRoutes from './routes/agenda.routes';
import citasRoutes from './routes/citas.routes';
import episodioRoutes from './routes/episodios.routes';
import notasRoutes from './routes/notas.routes';
import diagnosticoRoutes from './routes/diagnosticos.routes';
import ordenRoutes from './routes/ordenes.routes';
import resultadoRoutes from './routes/resultados.routes';
import aseguradoraRoutes from './routes/aseguradoras.routes';
import planRoutes from './routes/planes.routes';
import afiliacionRoutes from './routes/afiliaciones.routes';
import prestacionRoutes from './routes/prestaciones.routes';
import arancelRoutes from './routes/aranceles.routes';
import facturaRoutes from './routes/facturas.routes';
import usuarioRoutes from './routes/usuarios.routes';
import notificacionRoutes from './routes/notificaciones.routes';
import consentimientoRoutes from './routes/consentimientos.routes';
import prescripcionesRoutes from './routes/prescripciones.routes';
import pagosRoutes from './routes/pagos.routes';
import notasContablesRoutes from './routes/notas-contables.routes';
import autorizacionesRoutes from './routes/autorizaciones.routes';

const app: Application = express();

// --- Middlewares Globales ---
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- Trazabilidad Global ---
app.use(auditLogger);

// --- Documentación Swagger ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Registro de Rutas API ---
app.use('/api/auth', authRoutes);
app.use('/api/personas', personaRoutes);
app.use('/api/profesionales', profesionalRoutes);
app.use('/api/unidades', unidadesRoutes);
app.use('/api/agendas', agendaRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/episodios', episodioRoutes);
app.use('/api/notas', notasRoutes);
app.use('/api/diagnosticos', diagnosticoRoutes);
app.use('/api/ordenes', ordenRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/aseguradoras', aseguradoraRoutes);
app.use('/api/planes', planRoutes);
app.use('/api/afiliaciones', afiliacionRoutes);
app.use('/api/prestaciones', prestacionRoutes);
app.use('/api/aranceles', arancelRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/consentimientos', consentimientoRoutes);
app.use('/api/prescripciones', prescripcionesRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/notas-contables', notasContablesRoutes);
app.use('/api/autorizaciones', autorizacionesRoutes);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    environment: config.nodeEnv,
    version: '1.1.0',
    timestamp: new Date().toISOString()
  });
});

// Manejo de 404 (Debe ir después de todas las rutas definidas)
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Middleware de Errores (Último middleware de la cadena)
app.use(errorMiddleware);

export default app;