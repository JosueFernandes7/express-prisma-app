import { PrismaClient } from '@prisma/client';

class AccessLogRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createAccessLog(userId, url, granted) {
    return this.prisma.accessLog.create({
      data: {
        userId,
        url,
        granted,
      },
    });
  }

  async getAllLogs() {
    return this.prisma.accessLog.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { accessTime: 'desc' },
    });
  }
  
}

export default AccessLogRepository;
