import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.get('/', IndexController.WeddingReviewsCtrl.index);
router.post('/', IndexController.WeddingReviewsCtrl.create);
router.get('/:id', authJWT.ensureUser, IndexController.WeddingReviewsCtrl.show);
router.put(
	'/:id',
	authJWT.ensureUser,
	IndexController.WeddingReviewsCtrl.update
);
router.delete(
	'/:id',
	authJWT.ensureUser,
	IndexController.WeddingReviewsCtrl.destroy
);

export default router;
