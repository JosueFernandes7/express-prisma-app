import UserRepository from '../repositories/userRepository.js';
import ModuleRepository from '../repositories/moduleRepository.js';
import PermissionRepository from '../repositories/permissionRepository.js';
import bcrypt from 'bcrypt';
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.moduleRepository = new ModuleRepository();
    this.permissionRepository = new PermissionRepository();
  }

  async getAllUsersWithModules() {
    const users = await this.userRepository.getAllUsersWithModules();
    const allModules = await this.moduleRepository.getAllModules();

    return users.map(user => {
      if (user.role === 'SUPERUSER' || user.role === 'ADMIN') {
        return {
          ...user,
          allModules: true,
          permissions: allModules.map(module => ({ module })),
        };
      }
      return user;
    });
  }
  async createUser(userData, creatorRole) {
    const { role, password } = userData;

    // Verifica se o criador tem permissão para criar o tipo de usuário
    if (role === 'ADMIN' && creatorRole !== 'SUPERUSER') {
      throw new Error('Apenas superusuários podem criar administradores.');
    }

    if (role === 'ADMIN' && creatorRole === 'ADMIN') {
      throw new Error('Administradores não podem criar outros administradores.');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário com a senha criptografada
    const user = await this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    // Atribui permissões automáticas
    if (role === 'ADMIN') {
      const allModules = await this.moduleRepository.getAllModules();
      for (const module of allModules) {
        await this.permissionRepository.addPermission(user.id, module.id);
      }
    } else if (role === 'USER') {
      const profileModule = await this.moduleRepository.findModuleByName('Perfil');
      if (profileModule) {
        await this.permissionRepository.addPermission(user.id, profileModule.id);
      }
    }

    return user;
  }
}

export default UserService;
