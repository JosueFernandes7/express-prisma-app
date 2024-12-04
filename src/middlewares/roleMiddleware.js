class RoleMiddleware {

  ensureRole(allowedRoles, errorMessage) {
    return (req, res, next) => {
      const userRole = req.session.user?.role;

      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.render('error', { error: `Acesso negado: ${errorMessage}` });
      }

      next();
    };
  }
}

export default new RoleMiddleware();
