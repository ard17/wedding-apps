import { Router } from 'express';
import IndexController from '../controller/IndexController';
import UpDonwloadHelper from '../helpers/UpDownloadHelper';
import authJWT from '../helpers/authJWT';

const router = Router();

router.get('/', IndexController.WeddingGalleryCtrl.findAllRows);
router.get('/images/:filename', UpDonwloadHelper.showGallery);
router.get('/:wegaId', IndexController.WeddingGalleryCtrl.findRowById);

//router.post("/", IndexController.WeddingGalleryCtrl.createWeddingGallery);

router.post(
	'/multipart',
	authJWT.ensureVendor,
	IndexController.WeddingGalleryCtrl.uploadWeddingGallery,
	IndexController.WeddingGalleryCtrl.createWeddingGallery,
	IndexController.WeddingGalleryCtrl.findRowById
);

//router.put("/:id", IndexController.WeddingGalleryCtrl.updateWeddingGallery);

router.delete(
	'/:id',
	authJWT.ensureVendor,
	IndexController.WeddingGalleryCtrl.deleteRow
);

export default router;
