import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.post("/",IndexController.WedReserveCtrl.createWeddReserve);
router.put("/:id",IndexController.WedReserveCtrl.updateWeddReserve);
router.get("/",IndexController.WedReserveCtrl.findAllWeddReserve);
router.get("/:id",IndexController.WedReserveCtrl.findWeddReserveById);
router.delete("/:id",IndexController.WedReserveCtrl.deleteWeddReserve);

export default router;
