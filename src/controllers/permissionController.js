import PermissionRepository from "../repositories/permissionRepository.js";
import UserRepository from "../repositories/userRepository.js";

class PermissionController {
  constructor() {
    this.permissionRepository = new PermissionRepository();
    this.userRepository = new UserRepository();
  }

  async renderManagePermissions(req, res) {
    try {
      const modules = await this.permissionRepository.getAllModules();
      const users = await this.userRepository.getAllUsers();
      res.render("managePermissions", { modules, users, error: null });
    } catch (err) {
      console.error("Erro ao carregar permissões:", err.message);
      res.render("error", { error: "Erro ao carregar permissões: " + err.message });
    }
  }

  async addPermission(req, res) {
    try {
      const userId = parseInt(req.body.userId, 10);
      const moduleId = parseInt(req.body.moduleId, 10);

      if (isNaN(userId) || isNaN(moduleId)) {
        throw new Error("IDs de usuário e módulo devem ser números válidos.");
      }

      const permissionExists = await this.permissionRepository.findPermission(userId, moduleId);
      if (permissionExists) {
        throw new Error("Permissão já concedida.");
      }

      await this.permissionRepository.addPermission(userId, moduleId);
      res.status(200).send({
        status: "success",
        message: "Permissão concedida com sucesso!",
      });
    } catch (err) {
      console.error("Erro ao adicionar permissão:", err.message);
      res.status(400).send({
        status: "failed",
        message: err.message,
      });
    }
  }

  async revokePermission(req, res) {
    try {
      const userId = parseInt(req.body.userId, 10);
      const moduleId = parseInt(req.body.moduleId, 10);

      if (isNaN(userId) || isNaN(moduleId)) {
        throw new Error("IDs de usuário e módulo devem ser números válidos.");
      }

      const permissionExists = await this.permissionRepository.findPermission(userId, moduleId);
      if (!permissionExists) {
        throw new Error("Permissão não encontrada.");
      }

      await this.permissionRepository.revokePermission(userId, moduleId);
      res.status(200).send({
        status: "success",
        message: "Permissão removida com sucesso!",
      });
    } catch (err) {
      console.error("Erro ao revogar permissão:", err.message);
      res.status(400).send({
        status: "failed",
        message: err.message,
      });
    }
  }
}

export default PermissionController;
