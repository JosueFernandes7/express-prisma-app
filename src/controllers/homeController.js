import UserService from '../services/userService.js';
import ModuleService from '../services/moduleService.js';

class HomeController {
  constructor() {
    this.userService = new UserService();
    this.moduleService = new ModuleService();
  }

  async viewHome(req, res) {
    try {
      const userId = req.session.user.id;
      const role = req.session.user.role;

      // Busca todos os usuários com suas permissões
      const users = await this.userService.getAllUsersWithModules();

      // Busca módulos acessíveis ao usuário logado
      const modules = await this.moduleService.getAccessibleModules(userId, role);
      console.log({ user: req.session.user, users, modules });
      
      res.render('home', { user: req.session.user, users, modules });
    } catch (err) {
      res.render('error', { error: 'Erro ao carregar a página inicial: ' + err.message });
    }
  }
}

export default HomeController;
