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
}

export default UserRepository;
