import PermissionRepository from '../repositories/permissionRepository.js';
import AccessLogRepository from '../repositories/accessLogRepository.js';

class PermissionMiddleware {
  constructor() {
    this.permissionRepository = new PermissionRepository();
    this.accessLogRepository = new AccessLogRepository();
  }

  ensurePermission(moduleName) {
    return async (req, res, next) => {
      const user = req.session.user;

      if (!user) {
        await this.accessLogRepository.createAccessLog(null, req.originalUrl, false);
        return res.redirect('/auth/login'); 
      }

      if (user.role === 'SUPERUSER' || user.role === 'ADMIN') {
        await this.accessLogRepository.createAccessLog(user.id, req.originalUrl, true);
        return next();
      }

      try {
        const module = await this.permissionRepository.findModuleByName(moduleName);
        if (!module) {
          await this.accessLogRepository.createAccessLog(user.id, req.originalUrl, false);
          return res.render('error', { error: `O módulo ${moduleName} não existe.` });
        }

        const hasPermission = await this.permissionRepository.findPermission(user.id, module.id);
        await this.accessLogRepository.createAccessLog(user.id, req.originalUrl, !!hasPermission);

        if (!hasPermission) {
          return res.render('error', { error: `Você não tem permissão para acessar o módulo ${moduleName}.` });
        }

        next(); 
      } catch (err) {
        
        await this.accessLogRepository.createAccessLog(user.id, req.originalUrl, false);
        res.render('error', { error: 'Erro ao verificar permissões: ' + err.message });
      }
    };
  }
}

export default new PermissionMiddleware();
