import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.post(
	'/',
	authJWT.ensureVendor,
	IndexController.WeddPackageCtrl.createWeddPackage
);
router.put(
	'/:id',
	authJWT.ensureVendor,
	IndexController.WeddPackageCtrl.updateWeddPackage
);
router.get('/', IndexController.WeddPackageCtrl.findAllWeddPackage);
router.get('/:id', IndexController.WeddPackageCtrl.findWeddPackageById);
router.delete(
	'/:id',
	authJWT.ensureVendor,
	IndexController.WeddPackageCtrl.deleteWeddPackage
);

export default router;
