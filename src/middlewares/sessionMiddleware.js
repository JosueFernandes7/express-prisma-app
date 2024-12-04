class SessionMiddleware {
  
  ensureAuthenticated(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/auth/login'); 
    }
    next();
  }
}

export default new SessionMiddleware();
