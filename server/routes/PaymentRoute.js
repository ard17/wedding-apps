import { Router } from 'express';
import IndexController from '../controller/IndexController';
import MidPayment from '../helpers/MidPayment';
import authJWT from '../helpers/authJWT';

const router = Router();

router.post(
	'/topup',
	authJWT.ensureUser,
	MidPayment.updateBankAcc,
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);
router.post(
	'/cancelorder',
	authJWT.ensureUser,
	MidPayment.getDataTrx,
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);
router.post(
	'/payorder',
	authJWT.ensureUser,
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);
router.post(
	'/closeorder',
	authJWT.ensureUser,
	MidPayment.getDataTrx,
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);
router.post(
	'/tarikuang',
	authJWT.ensureVendor,
	MidPayment.getDataTrx,
	MidPayment.updateBankAcc,
	MidPayment.updatePaymentAcc,
	IndexController.PaytTransCtrl.create
);

export default router;
