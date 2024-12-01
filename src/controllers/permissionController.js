import PermissionService from '../services/permissionService.js';

class PermissionController {
  constructor() {
    this.permissionService = new PermissionService();
  }

  async renderManagePermissions(req, res) {
    try {
      const modules = await this.permissionService.getAllModules();
      const users = await this.permissionService.getAllUsers();
      res.render('managePermissions', { modules, users, error: null });
    } catch (err) {
      res.render('error', { error: 'Erro ao carregar permissões: ' + err.message });
    }
  }

  async addPermission(req, res) {
    
    try {
      // Converte os valores para números
      const userId = parseInt(req.body.userId, 10);
      const moduleId = parseInt(req.body.moduleId, 10);
      
      if (isNaN(userId) || isNaN(moduleId)) {
        throw new Error('IDs de usuário e módulo devem ser números válidos.');
      }
      
      await this.permissionService.addPermission(userId, moduleId);
      res.status(200).send({
        status: "success",
        message: "Permissão concedida com sucesso!"
      })
    } catch (err) {
      res.status(400).send({
        status: "failed",
        message: err.message
      })
      
    }
  }
  
  async revokePermission(req, res) {
    try {
      // Converte os valores para números
      const userId = parseInt(req.body.userId, 10);
      const moduleId = parseInt(req.body.moduleId, 10);
  
      if (isNaN(userId) || isNaN(moduleId)) {
        throw new Error('IDs de usuário e módulo devem ser números válidos.');
      }
  
      await this.permissionService.revokePermission(userId, moduleId);
      res.status(200).send({
        status: "success",
        message: "Permissão removida com sucesso!"
      })
    } catch (err) {
      res.status(400).send({
        status: "failed",
        message: err.message
      })
    }
  }
  
}

export default PermissionController;
