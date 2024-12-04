import UserRepository from "../repositories/userRepository.js";
import ModuleRepository from "../repositories/moduleRepository.js";

class HomeController {
  constructor() {
    this.userRepository = new UserRepository();
    this.moduleRepository = new ModuleRepository()
  }

  async viewHome(req, res) {
    try {
      const userId = req.session.user.id;
      const role = req.session.user.role;
      
      const users = await this.userRepository.getAllUsersWithModules();

      let modules;
      if (role === "SUPERUSER" || role === "ADMIN") {
        modules = await this.moduleRepository.getAllModules();
      } else {
        modules = await this.moduleRepository.getModulesByUserId(userId);
      }

      res.render("home", { user: req.session.user, users, modules });
    } catch (err) {
      res.render("error", { error: "Erro ao carregar a página inicial. Por favor, tente novamente." });
    }
  }
}

export default HomeController;
