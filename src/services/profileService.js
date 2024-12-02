import UserRepository from '../repositories/userRepository.js';

class ProfileService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserProfile(userId) {
    return this.userRepository.findUserById(userId);
  }

  async updateUserProfile(userId, { name, email, image }) {
    // Verifica se o e-mail já está em uso por outro usuário
    if (email) {
      const existingUser = await this.userRepository.findUserByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        throw new Error('O e-mail já está em uso por outro usuário.');
      }
    }
  
    const updateData = { name, email };
    if (image) {
      updateData.image = image;
    }
  
    return this.userRepository.updateUserById(userId, updateData);
  }
  
}

export default ProfileService;
