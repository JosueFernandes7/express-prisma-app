import express from 'express';
import multer from '../config/multerConfig.js';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';
import ProfileController from '../controllers/profileController.js';

const router = express.Router();
const profileController = new ProfileController();

router.get(
  '/',
  SessionMiddleware.ensureAuthenticated,
  (req, res) => profileController.viewProfile(req, res)
);

router.post(
  '/update',
  SessionMiddleware.ensureAuthenticated,
  multer.single('image'),
  (req, res) => profileController.updateProfile(req, res)
);

export {
  router as profileRoutes
};
