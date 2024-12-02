import { PrismaClient } from '@prisma/client';

class AccessLogRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Creates a new access log entry.
   * @param {number|null} userId - ID of the user attempting access (null for unauthenticated).
   * @param {string} url - URL the user attempted to access.
   * @param {boolean} granted - Whether the access was granted.
   * @returns {Promise<Object>} The created access log object.
   */
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
