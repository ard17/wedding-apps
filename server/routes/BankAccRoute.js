import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router({ mergeParams: true });

router.get('/', authJWT.ensureAdmin, IndexController.BankAccCtrl.index);
router.post('/', authJWT.ensureUser, IndexController.BankAccCtrl.create);
router.get('/:id', authJWT.ensureUser, IndexController.BankAccCtrl.show);
router.put('/:id', authJWT.ensureUser, IndexController.BankAccCtrl.update);
router.delete('/:id', authJWT.ensureUser, IndexController.BankAccCtrl.destroy);

export default router;
