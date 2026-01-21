# 🏥 API de Gestión de Servicios Médicos Integral

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-indigo)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

API REST de grado industrial para la gestión integral de instituciones de salud.  
Garantiza trazabilidad completa desde la admisión del paciente hasta la facturación electrónica, con enfoque en seguridad, escalabilidad y buenas prácticas de ingeniería de software.

Desarrollada con Node.js, TypeScript, Prisma ORM y MySQL 8.0.

---

## 👥 Equipo de Desarrollo

| Nombre                                | Cédula       | Correo                       | Rol                | Especialización                     |
|-------------------------------------|--------------|------------------------------|--------------------|-------------------------------------|
| Oscar Rafael Palencia Rodríguez     | 31.366.831   | 1001.31366831.ucla@gmail.com | Backend Developer  | Arquitectura API & Seguridad        |
| Roberto Daniel Alvarez Barrios      | 30.105.258   | 1001.30105258.ucla@gmail.com | Database Architect | Modelado de Datos & Prisma ORM      |

---

## 🚀 Stack Tecnológico

### Backend
- Runtime: Node.js 20.10.6 LTS
- Framework: Express.js 4.18.2 + TypeScript 5.3.3
- Autenticación: JWT (jsonwebtoken)
- Hashing de contraseñas: bcrypt
- Documentación: Swagger / OpenAPI 3.0

### Base de Datos
- Motor: MySQL 8.0
- ORM: Prisma 5.8.0
- Migraciones: Prisma Migrate
- Validación: Zod

### Seguridad y Calidad
- Control de acceso RBAC
- Rate Limiting
- CORS
- Testing: Jest + Supertest
- ESLint + Prettier

---

## 🧠 Arquitectura

Arquitectura en capas inspirada en Clean Architecture:

Routes → Controllers → Services → Repositories → Database

yaml
Copiar código

---

## 📊 Módulos del Sistema

### 🔐 Seguridad
- Registro y login de usuarios
- Autenticación con JWT
- Autorización por roles (Admin, Profesional, Recepción)

### 👥 Gestión de Personas
- Registro de pacientes
- Gestión de profesionales de la salud
- Especialidades y estados de actividad

### 🏥 Historia Clínica
- Episodios de atención
- Notas clínicas SOAP
- Sistema de adendas y versionado
- Diagnósticos CIE-10

### 📑 Aseguramiento
- Gestión de EPS y planes
- Validación de vigencia
- Autorizaciones de servicios
- Catálogo de prestaciones (CUPS e internas)

### 💰 Finanzas
- Facturación electrónica
- Registro de pagos y saldos
- Notas crédito y débito

---

## 🛠 Instalación

### Requisitos
```bash
node >= 20
mysql >= 8.0
Clonar el proyecto
bash
Copiar código
git clone https://github.com/Danber1701/lab1-proyecto-2025-30105258-31366831.git
cd lab1-proyecto-2025-30105258-31366831
npm ci
Variables de entorno
env
Copiar código
PORT=3000
DATABASE_URL="mysql://root:password@localhost:3306/medical_db"
JWT_SECRET="clave_secreta"
Configuración de la base de datos
bash
Copiar código
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
▶️ Comandos Disponibles
Comando  Descripción
npm run dev  Servidor de desarrollo
npm run build  Compilación a producción
npm start  Ejecutar servidor
npm run test  Ejecutar pruebas
npx prisma studio  Administrador visual de BD

---

### 📂 Estructura del Proyecto
arduino
Copiar código
src/
├── config/
├── controllers/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── schemas/
└── utils/

---

### 📡 Endpoints Principales
Autenticación
POST /api/auth/register

POST /api/auth/login

Historia Clínica
POST /api/episodios

POST /api/notas

Finanzas y Aseguramiento
POST /api/facturas

POST /api/autorizaciones/solicitar

GET /api/prestaciones

---

### 📚 Documentación API
Swagger disponible en:

http://localhost:3000/api-docs

---

### 📄 Licencia
Proyecto de uso académico y educativo.
Roberto and Oscar S.A.
© 2026