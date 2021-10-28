import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.post(
	'/',
	authJWT.ensureUser,
	IndexController.WedResLinesCtrl.createWeddResLines
);
router.put(
	'/:id',
	authJWT.ensureUser,
	IndexController.WedResLinesCtrl.updateWeddResLines
);
router.get(
	'/',
	authJWT.ensureUser,
	IndexController.WedResLinesCtrl.findAllWeddResLines
);
router.get(
	'/:id',
	authJWT.ensureUser,
	IndexController.WedResLinesCtrl.findWeddResLinesById
);
router.delete(
	'/:id',
	authJWT.ensureUser,
	IndexController.WedResLinesCtrl.deleteWeddResLines
);

export default router;
