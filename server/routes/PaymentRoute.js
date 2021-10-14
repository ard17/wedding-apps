import { Router } from 'express';
import IndexController from '../controller/IndexController';

const router = Router();

router.get('/hello', IndexController.PaymentCtrl.hello);

export default router;
