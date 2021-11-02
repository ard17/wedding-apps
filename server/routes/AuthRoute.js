import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

// method post
router.post('/signup', IndexController.UsersCtrl.signup);
router.get('/signin', authJWT.authenticate, authJWT.login);

export default router;
