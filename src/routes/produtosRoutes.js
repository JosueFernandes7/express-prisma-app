import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import PermissionMiddleware from '../middlewares/permissionMiddleware.js';
import ProdutosController from '../controllers/produtosController.js';

const router = express.Router();
const produtosController = new ProdutosController()

router.get(
  '/',
  SessionMiddleware.ensureAuthenticated,
  PermissionMiddleware.ensurePermission('Produtos'),
  (req, res) => produtosController.renderProdutos(req, res)
);

export {
    router as produtosRoutes
};
