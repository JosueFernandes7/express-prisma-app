import UserRepository from '../repositories/userRepository.js';
import ModuleRepository from '../repositories/moduleRepository.js';
import PermissionRepository from '../repositories/permissionRepository.js';

class PermissionService {
  constructor() {
    this.userRepository = new UserRepository();
    this.moduleRepository = new ModuleRepository();
    this.permissionRepository = new PermissionRepository();
  }

  async getAllModules() {
    return this.moduleRepository.getAllModules();
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async addPermission(userId, moduleId) {
    const user = await this.userRepository.findUserById(userId);
  
    if (!user || user.role === 'SUPERUSER' || user.role === 'ADMIN') {
      throw new Error('Permissões não podem ser configuradas para superusuários ou administradores.');
    }
  
    // Verifica se a permissão já existe
    const existingPermission = await this.permissionRepository.findPermission(userId, moduleId);
    if (existingPermission) {
      throw new Error('Permissão já existe para este usuário e módulo.');
    }
  
    return this.permissionRepository.addPermission(userId, moduleId);
  }
  
  
  

  async revokePermission(userId, moduleId) {
    return this.permissionRepository.revokePermission(userId, moduleId);
  }
}

export default PermissionService;
