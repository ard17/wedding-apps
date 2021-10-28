import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.get('/', IndexController.PaytTransCtrl.index);
router.post('/', authJWT.ensureAdmin, IndexController.PaytTransCtrl.create);
router.get('/:id', IndexController.PaytTransCtrl.show);
router.put('/:id', authJWT.ensureAdmin, IndexController.PaytTransCtrl.update);
router.delete(
	'/:id',
	authJWT.ensureAdmin,
	IndexController.PaytTransCtrl.destroy
);

export default router;
