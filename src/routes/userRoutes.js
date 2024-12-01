import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import RoleMiddleware from '../middlewares/roleMiddleware.js';
import UserController from '../controllers/userController.js';

const router = express.Router();
const userController = new UserController();
const ERROR_MESSAGE = "Você não tem permissão para criar usuários"
router.get(
  '/create',
  SessionMiddleware.ensureAuthenticated,
  RoleMiddleware.ensureRole(['SUPERUSER', 'ADMIN'], ERROR_MESSAGE),
  (req, res) => userController.renderCreateUser(req, res)
);

router.post(
  '/create',
  SessionMiddleware.ensureAuthenticated,
  RoleMiddleware.ensureRole(['SUPERUSER', 'ADMIN'], ERROR_MESSAGE),
  (req, res) => userController.createUser(req, res)
);

export {
    router as userRoutes
};
