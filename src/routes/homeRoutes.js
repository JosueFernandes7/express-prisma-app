import express from 'express';
import SessionMiddleware from '../middlewares/sessionMiddleware.js';

const router = express.Router();

router.get('/', SessionMiddleware.ensureAuthenticated, (req, res) => {
  // Passa os dados do usuário logado para a view
  res.render('home', { user: req.session.user });
});

export default router;
