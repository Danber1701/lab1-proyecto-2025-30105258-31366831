/**
 * Script de Bootstrap para el Sistema Médico Integral 2026
 * Ubicación: /database/seeders/seed.js
 * Ejecución: npm run prisma:seed
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Iniciando Carga de Datos Semilla con Prisma ---");

  // 1. Limpieza de datos previos
  console.log("Limpiando base de datos (respetando restricciones)...");
  
  // Nivel 4: Tablas con más dependencias
  await prisma.pago.deleteMany({});
  await prisma.facturaItem.deleteMany({});
  await prisma.prescripcionItem.deleteMany({});
  await prisma.ordenItem.deleteMany({});
  await prisma.resultado.deleteMany({});
  await prisma.diagnostico.deleteMany({});
  await prisma.notificacion.deleteMany({});
  await prisma.bitacoraAccesos.deleteMany({});

  // Nivel 3: Transaccionales principales
  await prisma.factura.deleteMany({});
  await prisma.autorizacion.deleteMany({});
  await prisma.arancel.deleteMany({});
  await prisma.prescripcion.deleteMany({});
  await prisma.orden.deleteMany({});
  await prisma.notaClinica.deleteMany({});
  await prisma.consentimiento.deleteMany({});
  await prisma.cita.deleteMany({});

  // Nivel 2: Entidades de proceso
  await prisma.episodioAtencion.deleteMany({});
  await prisma.afiliacion.deleteMany({});
  await prisma.agenda.deleteMany({});
  await prisma.usuarioRol.deleteMany({});

  // Nivel 1: Catálogos y Maestros
  await prisma.planCobertura.deleteMany({});
  await prisma.aseguradora.deleteMany({});
  await prisma.prestacion.deleteMany({});
  await prisma.profesional.deleteMany({});
  await prisma.unidadAtencion.deleteMany({});
  await prisma.personaAtendida.deleteMany({});
  await prisma.usuario.deleteMany({});
  await prisma.rol.deleteMany({});
  await prisma.permiso.deleteMany({});

  console.log("Base de datos limpia.");

  // 2. Roles y Usuario Administrador Inicial
  console.log("Configurando seguridad...");
  const adminRol = await prisma.rol.create({
    data: { 
      nombre: 'admin', 
      descripcion: 'Acceso total al sistema' 
    }
  });

  await prisma.rol.create({
    data: { 
      nombre: 'profesional', 
      descripcion: 'Acceso a gestión clínica y pacientes' 
    }
  });

  // Agregamos el rol de recepción para coincidir con la documentación OpenAPI
  await prisma.rol.create({
    data: { 
      nombre: 'recepcion', 
      descripcion: 'Gestión de citas y admisión de pacientes' 
    }
  });

  const hashedPassword = await bcrypt.hash('admin123456', 10);
  
  // CORRECCIÓN: Se usa la relación 'roles' (UsuarioRol) para asignar el rol al usuario
  // Esto resuelve el error "Unknown argument rolId" detectado previamente
  await prisma.usuario.create({
    data: {
      username: 'admin',
      email: 'admin@clinica.com',
      passwordHash: hashedPassword,
      estado: 'activo',
      roles: {
        create: {
          rolId: adminRol.id
        }
      }
    }
  });

  // 3. Unidades Médicas
  const unidad = await prisma.unidadAtencion.create({
    data: {
      nombre: "Unidad Médica Central",
      tipo: "Consultorio Especializado",
      direccion: "Avenida Principal #45-67",
      telefono: "6015551234",
      horarioReferencia: "Lunes a Viernes 07:00 - 19:00"
    }
  });

  // 4. Profesionales de la Salud (2 Profesionales)
  console.log("Creando profesionales...");
  const p1 = await prisma.profesional.create({
    data: {
      nombres: "Mariana",
      apellidos: "Velasquez",
      registroProfesional: "REG-99210-MED",
      especialidad: "Cardiología",
      correo: "m.velasquez@hospital.com",
      telefono: "3104445566",
      agendaHabilitada: true
    }
  });

  const p2 = await prisma.profesional.create({
    data: {
      nombres: "Ricardo",
      apellidos: "Torres",
      registroProfesional: "REG-44512-MED",
      especialidad: "Pediatría",
      correo: "r.torres@hospital.com",
      telefono: "3201112233",
      agendaHabilitada: true
    }
  });

  // 5. Prestaciones (Catálogo de 5 items)
  console.log("Cargando catálogo de prestaciones...");
  await prisma.prestacion.createMany({
    data: [
      { codigo: "P001", nombre: "Consulta General Primera Vez", tipo: "CONSULTA", grupo: "Medicina", requiereAutorizacion: false },
      { codigo: "P002", nombre: "Control Especialista", tipo: "CONSULTA", grupo: "Especialidades", requiereAutorizacion: false },
      { codigo: "L001", nombre: "Perfil Lipídico Completo", tipo: "LABORATORIO", grupo: "Laboratorio", requiereAutorizacion: true },
      { codigo: "L002", nombre: "Hemograma Tipo IV", tipo: "LABORATORIO", grupo: "Laboratorio", requiereAutorizacion: false },
      { codigo: "I001", nombre: "Radiografía de Tórax", tipo: "IMAGENOLOGIA", grupo: "Rayos X", requiereAutorizacion: true }
    ]
  });

  // 6. Aseguradora y Plan
  const eps = await prisma.aseguradora.create({
    data: {
      nombre: "Salud Total EPS",
      nit: "900.123.456-1",
      estado: "activo"
    }
  });

  await prisma.planCobertura.create({
    data: {
      aseguradoraId: eps.id,
      nombre: "Plan Platino Cobertura Total",
      condicionesGenerales: "Incluye medicina prepagada",
      estado: "activo"
    }
  });

  // 7. Persona (Paciente)
  await prisma.personaAtendida.create({
    data: {
      numeroDocumento: "1098765432",
      tipoDocumento: "CEDULA",
      nombres: "Ana Maria",
      apellidos: "Gomez Jurado",
      fechaNacimiento: new Date("1992-08-24"),
      sexo: "FEMENINO",
      correo: "ana.gomez@gmail.com",
      telefono: "3008889900",
      direccion: "Carrera 10 #5-20",
      alergias: "Penicilina"
    }
  });

  // 8. Agenda
  await prisma.agenda.create({
    data: {
      profesionalId: p1.id,
      unidadId: unidad.id,
      inicio: new Date("2026-03-01T08:00:00Z"),
      fin: new Date("2026-03-01T12:00:00Z"),
      capacidad: 10,
      estado: "abierto"
    }
  });

  console.log("--- Carga semilla finalizada con éxito ---");
  console.log("Acceso Admin -> Usuario: admin | Clave: admin123456");
}

main()
  .catch((e) => {
    console.error("Error al ejecutar el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });