import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.get('/', IndexController.PaytTransCtrl.index);
router.post('/', IndexController.PaytTransCtrl.create);
router.get('/:id', IndexController.PaytTransCtrl.show);
router.put('/:id', IndexController.PaytTransCtrl.update);
router.delete('/:id', IndexController.PaytTransCtrl.destroy);

export default router;
