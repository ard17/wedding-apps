import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.post('/', IndexController.WedResLinesCtrl.createWeddResLines);
router.put('/:id', IndexController.WedResLinesCtrl.updateWeddResLines);
router.get('/', IndexController.WedResLinesCtrl.findAllWeddResLines);
router.get('/:id', IndexController.WedResLinesCtrl.findWeddResLinesById);
router.delete('/:id', IndexController.WedResLinesCtrl.deleteWeddResLines);

export default router;
