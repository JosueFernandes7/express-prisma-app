import { PrismaClient }  from'@prisma/client'
import bcrypt  from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Verificar se o superusuário já existe
  const superUser = await prisma.user.findUnique({
    where: { email: 'superuser@example.com' },
  });

  if (!superUser) {
    // Criar o superusuário
    const hashedPassword = await bcrypt.hash('superuser', 10);

    await prisma.user.create({
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
    { name: 'Gestão de Usuários', description: 'Módulo de gestão de usuários' },
    { name: 'Perfil', description: 'Módulo de perfil do usuário' },
    { name: 'Financeiro', description: 'Módulo financeiro' },
    { name: 'Relatórios', description: 'Módulo de relatórios' },
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
