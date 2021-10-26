import { Router } from "express";
import IndexController from "../controller/IndexController";
import UpDonwloadHelper from "../helpers/UpDownloadHelper";

const router = Router();

router.get("/", IndexController.WeddingGalleryCtrl.findAllRows);
router.get("/images/:filename", UpDonwloadHelper.showGallery);

//router.post("/", IndexController.WeddingGalleryCtrl.createWeddingGallery);

router.post("/multipart",
    IndexController.WeddingGalleryCtrl.uploadWeddingGallery,
    IndexController.WeddingGalleryCtrl.createWeddingGallery,
    IndexController.WeddingGalleryCtrl.findRowById,
);

//router.put("/:id", IndexController.WeddingGalleryCtrl.updateWeddingGallery);



router.delete("/:id", IndexController.WeddingGalleryCtrl.deleteRow);


export default router;