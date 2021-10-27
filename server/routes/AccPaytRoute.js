import { Router } from 'express';
import IndexController from '../controller/IndexController';

const router = Router({ mergeParams: true });

router.get('/', IndexController.AccPaytCtrl.index);
router.post('/', IndexController.AccPaytCtrl.create);
router.get('/:id', IndexController.AccPaytCtrl.show);
router.put('/:id', IndexController.AccPaytCtrl.update);
router.delete('/:id', IndexController.AccPaytCtrl.destroy);

export default router;
