import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.post("/",IndexController.OrdersCtrl.createOrders);
router.put("/:id",IndexController.OrdersCtrl.updateOrder);
router.get("/",IndexController.OrdersCtrl.findAllOrders);
router.get("/:id",IndexController.OrdersCtrl.findOrderByOrderName);
router.delete("/:id",IndexController.OrdersCtrl.deleteOrder);

export default router;
