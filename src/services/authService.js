import bcrypt from 'bcrypt';
import UserRepository from '../repositories/userRepository.js'

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async validateUser(email, password) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      return null; // User not found
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; // Invalid password
    }

    return { id: user.id, name: user.name, email: user.email, role: user.role }; // Return sanitized user data
  }
}

export default AuthService;
