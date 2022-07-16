import express from 'express';
import UserCtrl from "../controllers/UserController";
import { middlewareJWT } from "../middleware";

const router = express.Router();

router.get('/', middlewareJWT, UserCtrl.index);
router.get('/:id', middlewareJWT, UserCtrl.show);

export default router;
