import UserRepository from "../repositories/userRepository.js";

class ProfileController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async viewProfile(req, res) {
    try {
      const user = await this.userRepository.findUserById(req.session.user.id);
      if (!user) {
        throw new Error("Usuário não encontrado.");
      }
      res.render("profile", { user, error: null });
    } catch (err) {
      console.error("Erro ao carregar o perfil:", err.message);
      res.render("error", { error: "Erro ao carregar o perfil: " + err.message });
    }
  }

  async updateProfile(req, res) {
    const { name, email } = req.body;
    const image = req.file ? req.file.filename : null;
    
    try {
      const updateData = { name, email };
      
      updateData.image = image;

      const updatedUser = await this.userRepository.updateUserById(req.session.user.id, updateData);
      if (!updatedUser) {
        throw new Error("Não foi possível atualizar o perfil.");
      }

      res.json({
        status: "success",
        message: "Perfil atualizado com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao atualizar o perfil:", err.message);
      res.json({
        status: "failed",
        message: "Erro ao atualizar o perfil: " + err.message,
      });
    }
  }
}

export default ProfileController;
