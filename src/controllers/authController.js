import bcrypt from "bcrypt";
import UserRepository from "../repositories/userRepository.js";

class AuthController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  renderLogin(req, res) {
    res.render("login", { error: null });
  }

  async processLogin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await this.userRepository.findUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render("login", { error: "E-mail ou senha inválidos" });
      }

      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      console.log("USUÁRIO LOGADO:", req.session.user);
      res.redirect("/");
    } catch (err) {
      console.error("Erro durante o login:", err.message);
      res.render("error", { error: "Erro ao processar o login." });
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erro ao encerrar sessão:", err.message);
        return res.status(500).send("Erro ao encerrar a sessão.");
      }
      res.redirect("/auth/login");
    });
  }
}

export default AuthController;
