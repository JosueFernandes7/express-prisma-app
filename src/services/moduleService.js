import ModuleRepository from '../repositories/moduleRepository.js';

class ModuleService {
  constructor() {
    this.moduleRepository = new ModuleRepository();
  }

  async getAccessibleModules(userId, role) {
    // Superusuário e administradores têm acesso a todos os módulos
    if (role === 'SUPERUSER' || role === 'ADMIN') {
      return this.moduleRepository.getAllModules();
    }

    // Busca módulos com base nas permissões do usuário
    return this.moduleRepository.getModulesByUserId(userId);
  }
}

export default ModuleService;
