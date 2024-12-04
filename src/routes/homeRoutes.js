import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import HomeController from '../controllers/homeController.js';

const router = express.Router();
const homeController = new HomeController();

router.get(
  '/',
  SessionMiddleware.ensureAuthenticated,
  (req, res) => homeController.viewHome(req, res)
);

export  {
  router as homeRoutes
};
