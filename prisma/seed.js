import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Verificar se o superusuário já existe
  let superUser = await prisma.user.findUnique({
    where: { email: 'superuser@example.com' },
  });

  if (!superUser) {
    // Criar o superusuário
    const hashedPassword = await bcrypt.hash('superuser', 10);

    superUser = await prisma.user.create({
      data: {
        name: 'superuser',
        email: 'superuser@example.com',
        password: hashedPassword,
        role: 'SUPERUSER',
      },
    });

    console.log('Superusuário criado com sucesso.');
  } else {
    console.log('Superusuário já existe.');
  }

  // Inserir módulos fixos
  const modules = [
    { name: 'Gestao', description: 'Módulo de gestão de usuários' },
    { name: 'Perfil', description: 'Módulo de perfil do usuário' },
    { name: 'Financeiro', description: 'Módulo financeiro' },
    { name: 'Relatorios', description: 'Módulo de relatórios' },
    { name: 'Produtos', description: 'Módulo de produtos' },
  ];

  for (const moduleData of modules) {
    const existingModule = await prisma.module.findUnique({
      where: { name: moduleData.name },
    });

    if (!existingModule) {
      await prisma.module.create({
        data: moduleData,
      });
      console.log(`Módulo "${moduleData.name}" criado com sucesso.`);
    } else {
      console.log(`Módulo "${moduleData.name}" já existe.`);
    }
  }

  // Garantir que o superusuário tenha permissão para todos os módulos
  const allModules = await prisma.module.findMany();
  for (const module of allModules) {
    const existingPermission = await prisma.permission.findUnique({
      where: {
        userId_moduleId: {
          userId: superUser.id,
          moduleId: module.id,
        },
      },
    });

    if (!existingPermission) {
      await prisma.permission.create({
        data: {
          userId: superUser.id,
          moduleId: module.id,
        },
      });
      console.log(`Permissão para o módulo "${module.name}" adicionada ao superusuário.`);
    } else {
      console.log(`Permissão para o módulo "${module.name}" já existe para o superusuário.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
