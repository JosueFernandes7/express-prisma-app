import { PrismaClient } from '@prisma/client';

class ModuleRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllModules() {
    return this.prisma.module.findMany();
  }
  
  async findModuleByName(name) {
    return this.prisma.module.findUnique({
      where: { name },
    });
  }
  
  async getModulesByUserId(userId) {
    return this.prisma.module.findMany({
      where: {
        permissions: {
          some: { userId },
        },
      },
    });
  }
}

export default ModuleRepository;
