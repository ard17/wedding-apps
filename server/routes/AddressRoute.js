import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.get('/', IndexController.AddressCtrl.findAllRows);

router.get('/:id', IndexController.AddressCtrl.findRowById);
router.get(
	'/:userid',
	authJWT.ensureUser,
	IndexController.AddressCtrl.findByOne
);

// method post
router.post('/', IndexController.AddressCtrl.createRow);
// put
router.put('/:id', IndexController.AddressCtrl.updateRow);
// delete
router.delete('/:id', IndexController.AddressCtrl.deleteRow);

export default router;
