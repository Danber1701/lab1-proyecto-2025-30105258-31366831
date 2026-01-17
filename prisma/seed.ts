import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando el proceso de Seed...');

  // 1. CREACIÓN DE PERMISOS
  // Usamos upsert para evitar errores si el script se corre varias veces
  const permisos = [
    { clave: 'AUTORIZACIONES_CREAR', descripcion: 'Solicitar nuevas autorizaciones' },
    { clave: 'AUTORIZACIONES_ADMIN', descripcion: 'Aprobar o rechazar autorizaciones' },
    { clave: 'FACTURACION_CREAR', descripcion: 'Generar facturas médicas' }
  ];

  console.log('📦 Creando/Actualizando permisos...');
  for (const p of permisos) {
    await prisma.permiso.upsert({
      where: { clave: p.clave },
      update: {},
      create: p
    });
  }

  // 2. CREACIÓN DE ROLES
  console.log('👥 Creando rol ADMINISTRADOR...');
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: 'ADMINISTRADOR' },
    update: {},
    create: {
      nombre: 'ADMINISTRADOR',
      descripcion: 'Control total del sistema médico'
    }
  });

  // 3. VINCULACIÓN ROL-PERMISO
  // Buscamos todos los permisos que acabamos de crear
  const todosLosPermisos = await prisma.permiso.findMany();

  console.log('🔗 Vinculando permisos al rol ADMINISTRADOR...');
  for (const permiso of todosLosPermisos) {
    await prisma.rolPermiso.upsert({
      // Suponiendo que tu modelo RolPermiso tiene un ID o una clave compuesta
      where: { 
        rolId_permisoId: { // Esta es una clave única compuesta común en Prisma
          rolId: rolAdmin.id,
          permisoId: permiso.id 
        } 
      },
      update: {},
      create: {
        rolId: rolAdmin.id,
        permisoId: permiso.id
      }
    });
  }

  console.log('✨ Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });