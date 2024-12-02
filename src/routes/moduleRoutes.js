import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import PermissionMiddleware from '../middlewares/permissionMiddleware.js';

const router = express.Router();

router.get(
  '/financeiro',
  SessionMiddleware.ensureAuthenticated,
  PermissionMiddleware.ensurePermission('Financeiro'),
  (req, res) => {
    res.render('module', { title: 'Módulo Financeiro' });
  }
);

router.get(
  '/relatorios',
  SessionMiddleware.ensureAuthenticated,
  PermissionMiddleware.ensurePermission('Relatórios'),
  (req, res) => {
    res.render('module', { title: 'Módulo Relatórios' });
  }
);

router.get(
  '/produtos',
  SessionMiddleware.ensureAuthenticated,
  PermissionMiddleware.ensurePermission('Produtos'),
  (req, res) => {
    res.render('module', { title: 'Módulo Produtos' });
  }
);

export {
    router as moduleRoutes
};