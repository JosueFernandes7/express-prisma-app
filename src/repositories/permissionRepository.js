import { PrismaClient } from '@prisma/client';

class PermissionRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async addPermission(userId, moduleId) {
    return this.prisma.permission.create({
      data: { userId, moduleId },
    });
  }
  

  async revokePermission(userId, moduleId) {
    return this.prisma.permission.deleteMany({
      where: { userId, moduleId },
    });
  }
  async findPermission(userId, moduleId) {
    return this.prisma.permission.findUnique({
      where: {
        userId_moduleId: { userId, moduleId }, // Refere-se à chave composta definida no Prisma
      },
    });
  }

  async findModuleByName(name) {
    return this.prisma.module.findUnique({
      where: { name },
    });
  }
  
}

export default PermissionRepository;
