import UserService from "../services/userService.js";
import logger from "../config/logger.js";
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
    try {
      const role = req.session.user?.role;
      res.render("createUser", { role: role, error: null });
    } catch (err) {
      logger.error(`Error rendering create user form: ${err.message}`);
      res.render("error", { error: "Failed to load the user creation form." });
    }
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
      await this.userService.createUser(
        { name, email, password, role },
        creatorRole
      );
      logger.info(`User created: ${email} by ${req.session.user.email}`);
      res.redirect("/");
    } catch (err) {
      logger.error(`Error creating user ${email}: ${err.message}`);
      res.render("createUser", {
        role: creatorRole,
        error: err.message,
      });
    }
  }
}

export default UserController;
