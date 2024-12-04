import User from "../models/User.js";
import UserRepository from "../repositories/userRepository.js";
import PermissionRepository from "../repositories/permissionRepository.js";
import ModuleRepository from "../repositories/moduleRepository.js";

import bcrypt from "bcrypt";

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.permissionRepository = new PermissionRepository();
    this.moduleRepository = new ModuleRepository();
  }

  renderCreateUser(req, res) {
    try {
      const role = req.session.user?.role;
      res.render("createUser", { role: role, error: null });
    } catch (err) {
      res.render("error", { error: "Erro ao carregar o formulário de criação de usuário." });
    }
  }

  async createUser(req, res) {
    const { name, email, password, role } = req.body;
    const creatorRole = req.session.user?.role;

    try {
      if (!name || !email || !password || !role) {
        throw new Error("Todos os campos são obrigatórios.");
      }

      const user = new User(name, email, password, role);
      console.log(user);
      
      if (!user.validateEmail()) {
        throw new Error("E-mail inválido.");
      }

      const existingUser = await this.userRepository.findUserByEmail(email);
      if (existingUser) {
        throw new Error("E-mail já está em uso.");
      }

      user.password = await bcrypt.hash(password, 10);
      const createdUser = await this.userRepository.createUser(user);
      if (role.toUpperCase() === "USER") {
        const profileModule = await this.permissionRepository.findModuleByName("Perfil");
        if (profileModule) {
          await this.permissionRepository.addPermission(createdUser.id, profileModule.id);
        }
      } else if (role.toUpperCase() === "ADMIN" || role.toUpperCase() === "SUPERUSER") {
        const allModules = await this.moduleRepository.getAllModules();
        for (const module of allModules) {
          await this.permissionRepository.addPermission(createdUser.id, module.id);
        }
      }
      res.redirect("/");
    } catch (err) {
      res.render("createUser", {
        role: creatorRole,
        error: err.message,
      });
    }
  }
}

export default UserController;
