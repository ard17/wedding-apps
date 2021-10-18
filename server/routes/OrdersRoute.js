import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.post("/",IndexController.OrdersCtrl.createOrders);
router.put("/",IndexController.OrdersCtrl.updateOrder);
router.get("/:id",IndexController.OrdersCtrl.findAllOrders);
router.delete("/:id",IndexController.OrdersCtrl.deleteOrder);

export default router;
