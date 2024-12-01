import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import RoleMiddleware from '../middlewares/roleMiddleware.js';
import PermissionController from '../controllers/permissionController.js';

const router = express.Router();
const permissionController = new PermissionController();
const ERROR_MESSAGE = 'Você não tem permissão para setar modulos'

// Rota para gerenciar permissões (exibe os módulos e usuários)
router.get(
  '/',
  SessionMiddleware.ensureAuthenticated,
  RoleMiddleware.ensureRole(['SUPERUSER', 'ADMIN'], ERROR_MESSAGE),
  (req, res) => permissionController.renderManagePermissions(req, res)
);

// Rota para adicionar permissão
router.post(
  '/add',
  SessionMiddleware.ensureAuthenticated,
  RoleMiddleware.ensureRole(['SUPERUSER', 'ADMIN'], ERROR_MESSAGE),
  (req, res) => permissionController.addPermission(req, res)
);

// Rota para revogar permissão
router.post(
  '/revoke',
  SessionMiddleware.ensureAuthenticated,
  RoleMiddleware.ensureRole(['SUPERUSER', 'ADMIN'], ERROR_MESSAGE),
  (req, res) => permissionController.revokePermission(req, res)
);

export {
  router as permissionRoutes
};
