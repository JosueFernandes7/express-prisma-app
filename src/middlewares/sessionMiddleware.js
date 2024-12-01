class SessionMiddleware {
  /**
   * Ensures the user is authenticated before accessing the route.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {Function} next - Next middleware function.
   */
  ensureAuthenticated(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/auth/login'); // Redirect to login if not authenticated
    }
    next();
  }
}

export default new SessionMiddleware();
