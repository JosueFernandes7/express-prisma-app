import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import RoleMiddleware from '../middlewares/roleMiddleware.js';
import LogController from '../controllers/logController.js';

const router = express.Router();
const logController = new LogController();

router.get(
  '/',
  SessionMiddleware.ensureAuthenticated,
  RoleMiddleware.ensureRole(['SUPERUSER', 'ADMIN']),
  (req, res) => logController.viewLogs(req, res)
);

export {
    router as logRoutes
};
