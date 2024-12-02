import AccessLogRepository from '../repositories/accessLogRepository.js';

class LogController {
  constructor() {
    this.accessLogRepository = new AccessLogRepository();
  }

  async viewLogs(req, res) {
    try {
      const logs = await this.accessLogRepository.getAllLogs();
      res.render('accessLogs', { logs });
    } catch (err) {
      res.render('error', { error: 'Erro ao carregar logs de acesso: ' + err.message });
    }
  }
}

export default LogController;
