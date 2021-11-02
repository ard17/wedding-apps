import { Router } from 'express';
import IndexController from '../controller/IndexController';
import MidPayment from '../helpers/MidPayment';
import authJWT from '../helpers/authJWT';

const router = Router();

router.post(
	'/topup',
	MidPayment.updateBankAcc,
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);
router.post(
	'/cancelorder',
	MidPayment.getDataTrx,
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);
router.post(
	'/payorder',
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);
router.post(
	'/closeorder',
	MidPayment.getDataTrx,
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);
router.post(
	'/tarikuang',
	MidPayment.getDataTrx,
	MidPayment.updateBankAcc,
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);

export default router;
