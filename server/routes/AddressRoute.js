import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.get('/', authJWT.ensureAdmin, IndexController.AddressCtrl.findAllRows);

router.get('/:id', authJWT.ensureUser, IndexController.AddressCtrl.findRowById);
router.get(
	'/:userid',
	authJWT.ensureUser,
	IndexController.AddressCtrl.findByOne
);

// method post
router.post('/', authJWT.ensureUser, IndexController.AddressCtrl.createRow);
// put
router.put('/:id', authJWT.ensureUser, IndexController.AddressCtrl.updateRow);
// delete
router.delete(
	'/:id',
	authJWT.ensureUser,
	IndexController.AddressCtrl.deleteRow
);

export default router;
