import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.post("/",IndexController.WeddPackageCtrl.createWeddPackage);
router.put("/:id",IndexController.WeddPackageCtrl.updateWeddPackage);
router.get("/",IndexController.WeddPackageCtrl.findAllWeddPackage);
router.get("/:id",IndexController.WeddPackageCtrl.findWeddPackageById);
router.delete("/:id",IndexController.WeddPackageCtrl.deleteWeddPackage);

export default router;
