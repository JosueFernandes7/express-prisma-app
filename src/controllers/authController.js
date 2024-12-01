import AuthService from "../services/authService.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Renders the login page.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  renderLogin(req, res) {
    res.render('login', { error: null });
  }

  /**
   * Processes the login request.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  async processLogin(req, res) {
    const { email, password } = req.body;

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return res.render('login', { error: 'E-mail ou senha inválidos' });
    }

    // Store the user in the session
    req.session.user = user;
    console.log("USUÁRIO LOGADO");
    console.log(req.session.user);
    res.redirect('/'); // Redirect to the homepage
  }

  /**
   * Logs out the user and destroys the session.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Erro ao encerrar a sessão.');
      }
      res.redirect('/auth/login');
    });
  }
}

export default AuthController;
