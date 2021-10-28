import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

//router.get("/rawSQL",IndexController.WeddingVendorCtrl.findCategoryBySQL);
router.get('/', IndexController.WeddingVendorCtrl.findAllRows);
//router.get("/detail",IndexController.WeddingVendorCtrl.wedding_category);

router.get('/:id', IndexController.WeddingVendorCtrl.findRowById);

// method post
router.post(
	'/',
	authJWT.ensureVendor,
	IndexController.WeddingVendorCtrl.createRow
);
// put
router.put(
	'/:id',
	authJWT.ensureVendor,
	IndexController.WeddingVendorCtrl.updateRow
);
// delete
router.delete(
	'/:id',
	authJWT.ensureVendor,
	IndexController.WeddingVendorCtrl.deleteRow
);

export default router;
