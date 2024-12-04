import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import PermissionMiddleware from '../middlewares/permissionMiddleware.js';
import FinanceiroController from '../controllers/financeiroController.js';
const router = express.Router();
const financeiroController = new FinanceiroController()

router.get(
  '/',
  SessionMiddleware.ensureAuthenticated,
  PermissionMiddleware.ensurePermission('Financeiro'),
  (req, res) => financeiroController.renderFinanceiro(req, res)
);

export {
    router as financeiroRoutes
};
