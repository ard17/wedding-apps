import { Router } from "express";
import IndexController from "../controller/indexController";
import authJWT from "../helpers/authJWT.js";


const router = Router();

router.get("/rawSQL",IndexController.WeddingCategoryCtrl.findCategoryBySQL);
router.get("/",authJWT.ensureAdmin,IndexController.WeddingCategoryCtrl.findAllRows);
//router.get("/detail",IndexController.WeddingCategoryCtrl.wedding_category);

router.get("/:id",IndexController.WeddingCategoryCtrl.findRowById);



// method post
router.post("/",IndexController.WeddingCategoryCtrl.createRow);
// put
router.put("/:id",IndexController.WeddingCategoryCtrl.updateRow);
// delete
router.delete("/:id",IndexController.WeddingCategoryCtrl.deleteRow);

export default router;