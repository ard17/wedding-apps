import { Router } from 'express';
import IndexController from '../controller/IndexController';

const router = Router();

// method post
router.put('/:id', IndexController.UsersCtrl.updateRow);
router.delete('/:id', IndexController.UsersCtrl.deleteRow);

export default router;
