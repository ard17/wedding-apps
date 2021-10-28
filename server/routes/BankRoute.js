import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.get('/', IndexController.BankCtrl.index);
router.post('/', authJWT.ensureAdmin, IndexController.BankCtrl.create);
router.get('/:id', IndexController.BankCtrl.show);
router.put('/:id', authJWT.ensureAdmin, IndexController.BankCtrl.update);
router.delete('/:id', authJWT.ensureAdmin, IndexController.BankCtrl.destroy);

export default router;
