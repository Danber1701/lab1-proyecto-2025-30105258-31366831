import app from './app';
import config from './config/env';
import logger from './utils/logger';
import prisma from './config/database';

async function bootstrap() {
  try {
    // 1. Intentar conectar a la DB
    await prisma.$connect();
    logger.info('🐘 Base de datos conectada con éxito');

    // 2. Iniciar servidor
    app.listen(config.port, () => {
      logger.info(`🚀 Servidor en modo [${config.nodeEnv}]`);
      logger.info(`🔗 URL: http://localhost:${config.port}`);
    });
  } catch (error) {
    logger.error('❌ Error fatal al iniciar el servidor:');
    console.error(error);
    process.exit(1);
  }
}

bootstrap();