import ProfileService from "../services/profileService.js";

class ProfileController {
  constructor() {
    this.profileService = new ProfileService();
  }

  async viewProfile(req, res) {
    try {
      const user = await this.profileService.getUserProfile(
        req.session.user.id
      );
      res.render("profile", { user, error: null });
    } catch (err) {
      res.render("error", {
        error: "Erro ao carregar o perfil: " + err.message,
      });
    }
  }

  async updateProfile(req, res) {
    console.log("aqui");
    
    const { name, email } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      await this.profileService.updateUserProfile(req.session.user.id, {
        name,
        email,
        image,
      });
      // Resposta de sucesso
      res.json({
        status: "success",
        message: "Perfil atualizado com sucesso.",
      });
    } catch (err) {
      console.log(err.message);
      
      // Resposta de erro
      res.json({
        status: "failed",
        message: "Erro ao atualizar o perfil: " + err.message,
      });
    }
  }
}

export default ProfileController;
