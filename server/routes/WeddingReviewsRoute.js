import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.get('/', IndexController.WeddingReviewsCtrl.index);
router.post('/', IndexController.WeddingReviewsCtrl.create);
router.get('/:id', IndexController.WeddingReviewsCtrl.show);
router.put('/:id', IndexController.WeddingReviewsCtrl.update);
router.delete('/:id', IndexController.WeddingReviewsCtrl.destroy);

export default router;
