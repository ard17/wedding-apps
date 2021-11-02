import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router({ mergeParams: true });

router.get('/', IndexController.BankAccCtrl.index);
router.post('/', IndexController.BankAccCtrl.create);
router.get('/:id', IndexController.BankAccCtrl.show);
router.put('/:id', IndexController.BankAccCtrl.update);
router.delete('/:id', IndexController.BankAccCtrl.destroy);

export default router;
