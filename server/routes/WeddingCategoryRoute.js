import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.get('/', IndexController.WeddingCategoryCtrl.findAllRows);
//router.get("/detail",IndexController.WeddingCategoryCtrl.wedding_category);

router.get('/:id', IndexController.WeddingCategoryCtrl.findRowById);

// method post
router.post(
	'/',
	authJWT.ensureVendor,
	IndexController.WeddingCategoryCtrl.createRow
);
// put
router.put(
	'/:id',
	authJWT.ensureVendor,
	IndexController.WeddingCategoryCtrl.updateRow
);
// delete
router.delete(
	'/:id',
	authJWT.ensureVendor,
	IndexController.WeddingCategoryCtrl.deleteRow
);

export default router;
