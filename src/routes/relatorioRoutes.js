import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import PermissionMiddleware from '../middlewares/permissionMiddleware.js';
import RelatorioController from '../controllers/relatorioController.js';

const router = express.Router();
const relatorioController = new RelatorioController()

router.get(
  '/',
  SessionMiddleware.ensureAuthenticated,
  PermissionMiddleware.ensurePermission('Relatorios'),
  (req, res) => relatorioController.renderRelatorio(req, res)
);

export {
    router as relatorioRoutes
};
