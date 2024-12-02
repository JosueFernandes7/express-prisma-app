import bcrypt from "bcrypt";
import UserRepository from "../repositories/userRepository.js";
import ModuleRepository from "../repositories/moduleRepository.js";
import PermissionRepository from "../repositories/permissionRepository.js";

/**
 * Service for user-related business logic.
 */
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.moduleRepository = new ModuleRepository();
    this.permissionRepository = new PermissionRepository();
  }

  async getAllUsersWithModules() {
    const users = await this.userRepository.getAllUsersWithModules();
    const allModules = await this.moduleRepository.getAllModules();

    return users.map((user) => {
      if (user.role === "SUPERUSER" || user.role === "ADMIN") {
        return {
          ...user,
          allModules: true,
          permissions: allModules.map((module) => ({ module })),
        };
      }
      return user;
    });
  }

  /**
   * Creates a new user and assigns default permissions based on their role.
   * @param {Object} userData - User details (name, email, password, role).
   * @param {string} creatorRole - Role of the user creating this account.
   * @returns {Promise<Object>} - Created user object.
   * @throws {Error} - Throws if email is already in use or role assignment is invalid.
   */

  async createUser(userData, creatorRole) {
    const { role, password, email } = userData;

    // Check if email is already in use
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("O e-mail já está em uso por outro usuário.");
    }

    // Validate role assignment
    if (role === "ADMIN" && creatorRole !== "SUPERUSER") {
      throw new Error("Apenas superusuários podem criar administradores.");
    }

    if (role === "ADMIN" && creatorRole === "ADMIN") {
      throw new Error(
        "Administradores não podem criar outros administradores."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    // Assign permissions
    if (role === "ADMIN") {
      const allModules = await this.moduleRepository.getAllModules();
      for (const module of allModules) {
        await this.permissionRepository.addPermission(user.id, module.id);
      }
    } else if (role === "USER") {
      const profileModule = await this.moduleRepository.findModuleByName(
        "Perfil"
      );
      if (profileModule) {
        await this.permissionRepository.addPermission(
          user.id,
          profileModule.id
        );
      }
    }

    return user;
  }
}

export default UserService;
