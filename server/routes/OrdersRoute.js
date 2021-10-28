import { Router } from 'express';
import IndexController from '../controller/IndexController';
import authJWT from '../helpers/authJWT';

const router = Router();

router.post('/', authJWT.ensureUser, IndexController.OrdersCtrl.createOrders);
router.put('/:id', authJWT.ensureUser, IndexController.OrdersCtrl.updateOrder);
router.get('/', authJWT.ensureAdmin, IndexController.OrdersCtrl.findAllOrders);
router.get(
	'/:id',
	authJWT.ensureUser,
	IndexController.OrdersCtrl.findOrderByOrderName
);
router.delete(
	'/:id',
	authJWT.ensureAdmin,
	IndexController.OrdersCtrl.deleteOrder
);

export default router;
