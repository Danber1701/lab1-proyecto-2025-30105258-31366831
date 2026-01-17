import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { JsonObject } from 'swagger-ui-express'; // Importamos el tipo necesario

const yamlPath = path.join(__dirname, 'openapi.yaml');

let spec: JsonObject; // Definimos explícitamente el tipo aquí

try {
  const fileContents = fs.readFileSync(yamlPath, 'utf8');
  // Usamos "as JsonObject" para que TypeScript no se queje
  spec = yaml.load(fileContents) as JsonObject;
} catch (e) {
  console.error('❌ Error al cargar el archivo openapi.yaml:', e);
  spec = { 
    openapi: '3.0.0', 
    info: { title: 'Error cargando documentación', version: '1.0.0' } 
  } as JsonObject;
}

export const swaggerSpec = spec;