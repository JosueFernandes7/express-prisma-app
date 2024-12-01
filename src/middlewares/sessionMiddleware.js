class SessionMiddleware {
  
  ensureAuthenticated(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/auth/login'); // Redirect to login if not authenticated
    }
    next();
  }
}

export default new SessionMiddleware();
