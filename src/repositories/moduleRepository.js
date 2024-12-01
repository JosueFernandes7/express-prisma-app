import { PrismaClient } from '@prisma/client';

class ModuleRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllModules() {
    return this.prisma.module.findMany();
  }
}

export default ModuleRepository;
