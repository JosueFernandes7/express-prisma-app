import { PrismaClient } from '@prisma/client';

class UserRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async findUserByEmail(email) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  async createUser(userData) {
    return this.prisma.user.create({ data: userData });
  }
  async getAllUsers() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
      where: {
        role: 'USER'
      }
    });
  }

  async findUserById(userId) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getAllNonAdminUsers() {
    return this.prisma.user.findMany({
      where: {
        NOT: {
          role: { in: ['SUPERUSER', 'ADMIN'] },
        },
      },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async updateUserById(userId, updateData) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
  

}

export default UserRepository;
