import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();

router.get('/login', (req, res) => authController.renderLogin(req, res));
router.post('/login', (req, res) => authController.processLogin(req, res));
router.get('/logout', (req, res) => authController.logout(req, res));

export {
    router as authRoutes
};
