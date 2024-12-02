import UserService from '../services/userService.js';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  /**
   * Renders the create user form.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  renderCreateUser(req, res) {
    console.log("ROLE: ",req?.session?.user?.role);
    const role = req?.session?.user?.role
    res.render('createUser', { role: role, error: null });
  }

  /**
   * Handles user creation.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  async createUser(req, res) {
    const { name, email, password, role } = req.body;
    const creatorRole = req.session.user.role;
  
    try {
      await this.userService.createUser({ name, email, password, role }, creatorRole);
      res.redirect('/'); // Redireciona para a página inicial após criação
    } catch (err) {
      res.render('createUser', {
        role: creatorRole, // Certifica-se de passar o papel do criador
        error: err.message,
      });
    }
  }
  
}

export default UserController;
