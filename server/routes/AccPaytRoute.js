import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router({ mergeParams: true });

router.get('/', authJWT.ensureAdmin, IndexController.AccPaytCtrl.index);
router.post('/', authJWT.ensureUser, IndexController.AccPaytCtrl.create);
router.get('/:id', authJWT.ensureUser, IndexController.AccPaytCtrl.show);
router.put('/:id', authJWT.ensureUser, IndexController.AccPaytCtrl.update);
router.delete('/:id', authJWT.ensureUser, IndexController.AccPaytCtrl.destroy);

export default router;
