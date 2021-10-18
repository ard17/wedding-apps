import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// method post
router.post("/signup",IndexController.UsersCtrl.signup);
router.get("/signin",IndexController.UsersCtrl.signin);

export default router;