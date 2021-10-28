import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.post(
	'/',
	authJWT.ensureUser,
	IndexController.WedReserveCtrl.createWeddReserve
);
router.put(
	'/:id',
	authJWT.ensureUser,
	IndexController.WedReserveCtrl.updateWeddReserve
);
router.get(
	'/',
	authJWT.ensureAdmin,
	IndexController.WedReserveCtrl.findAllWeddReserve
);
router.get(
	'/:id',
	authJWT.ensureUser,
	IndexController.WedReserveCtrl.findWeddReserveById
);
router.delete(
	'/:id',
	authJWT.ensureAdmin,
	IndexController.WedReserveCtrl.deleteWeddReserve
);

export default router;
