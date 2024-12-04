import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import PermissionMiddleware from '../middlewares/permissionMiddleware.js';
import GestaoController from '../controllers/gestaoController.js';
const router = express.Router();
const gestaoController = new GestaoController()

router.get(
  '/',
  SessionMiddleware.ensureAuthenticated,
  PermissionMiddleware.ensurePermission('Gestao'),
  (req, res) => gestaoController.renderGestao(req, res)
);

export {
    router as gestaoRoutes
};
