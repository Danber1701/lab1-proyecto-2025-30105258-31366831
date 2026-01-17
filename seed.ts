import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- Iniciando Reconstrucción de Base de Datos ---');

  // 1. Crear Aseguradora
  const aseguradora = await prisma.aseguradora.create({
    data: { nombre: 'Salud Total EPS', nit: '900123456-1', estado: 'activo' }
  });

  // 2. Crear Plan de Cobertura
  const plan = await prisma.planCobertura.create({
    data: { nombre: 'Plan Premium', aseguradoraId: aseguradora.id, estado: 'activo' }
  });

  // 3. Crear Persona (Paciente)
  const persona = await prisma.personaAtendida.create({
    data: {
      tipoDocumento: 'CC',
      numeroDocumento: '12345678',
      nombres: 'Juan',
      apellidos: 'Pérez',
      sexo: 'M',
      fechaNacimiento: new Date('1990-05-15'),
      estado: 'activo'
    }
  });

  // 4. Crear Afiliación (Vincular Paciente con Plan)
  await prisma.afiliacion.create({
    data: {
      personaId: persona.id,
      planId: plan.id,
      numeroPoliza: 'POL-001',
      vigenteDesde: new Date('2020-01-01'),
      vigenteHasta: new Date('2030-12-31'),
      copago: 15000,
      cuotaModeradora: 3500,
      estado: 'activa'
    }
  });

  // 5. Crear la Prestación en el Catálogo
  await prisma.prestacion.create({
    data: {
      codigo: 'LAB-001',
      nombre: 'Hemograma Completo',
      tipo: 'LABORATORIO',
      grupo: 'DIAGNOSTICO',
      requiereAutorizacion: true
    }
  });

  // 6. Crear el Arancel (Precio para este Plan específico)
  await prisma.arancel.create({
    data: {
      prestacionCodigo: 'LAB-001',
      planId: plan.id,
      valorBase: 50000,
      impuestos: 9500,
      estado: 'vigente',
      vigenteDesde: new Date('2020-01-01'),
      vigenteHasta: new Date('2030-12-31')
    }
  });

  // 7. Crear un Profesional (Necesario para los Episodios)
  await prisma.profesional.create({
    data: {
      nombres: 'Dra. Ana',
      apellidos: 'García',
      registroProfesional: 'MED-123',
      especialidad: 'Medicina General',
      correo: 'ana@hospital.com',
      telefono: '3001234567'
    }
  });

  console.log('✅ Escenario recreado con éxito.');
  console.log(`ID Paciente: ${persona.id}`);
  console.log(`ID Plan: ${plan.id}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());