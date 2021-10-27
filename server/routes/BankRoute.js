import { Router } from 'express';
import IndexController from '../controller/IndexController';

const router = Router();

router.get('/', IndexController.BankCtrl.index);
router.post('/', IndexController.BankCtrl.create);
router.get('/:id', IndexController.BankCtrl.show);
router.put('/:id', IndexController.BankCtrl.update);
router.delete('/:id', IndexController.BankCtrl.destroy);

export default router;
