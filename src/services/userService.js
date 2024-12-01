import bcrypt from 'bcrypt';
import UserRepository from '../repositories/userRepository.js';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Creates a new user with hashed password.
   * @param {Object} userData - Data for the new user (name, email, password, role).
   * @param {string} creatorRole - Role of the user creating the new user.
   * @returns {Promise<Object>} Created user object.
   * @throws {Error} If the role is invalid for the creator's role.
   */
  async createUser(userData, creatorRole) {
    const { password, role } = userData;

    // Restrição: somente superusuário pode criar administradores
    if (role === 'ADMIN' && creatorRole !== 'SUPERUSER') {
      throw new Error('Apenas superusuários podem criar administradores.');
    }

    // Restrição: administradores não podem criar administradores
    if (role === 'ADMIN' && creatorRole === 'ADMIN') {
      throw new Error('Administradores não podem criar outros administradores.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.createUser({ ...userData, password: hashedPassword });
  }
}

export default UserService;
