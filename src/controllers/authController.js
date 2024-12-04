import AuthService from "../services/authService.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  renderLogin(req, res) {
    res.render('login', { error: null });
  }

  async processLogin(req, res) {
    const { email, password } = req.body;

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return res.render('login', { error: 'E-mail ou senha inválidos' });
    }
    req.session.user = user;
    console.log("USUÁRIO LOGADO");
    console.log(req.session.user);
    
    res.redirect('/'); 
  }

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
