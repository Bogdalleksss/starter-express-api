import express from 'express';
import FriendsCtrl from "../controllers/FriendsController";
import { middlewareJWT } from "../middleware";
import { friendshipValidation } from "../validations/friendship";

const router = express.Router();

router.get('/', middlewareJWT, FriendsCtrl.index);
router.post('/request', middlewareJWT, friendshipValidation, FriendsCtrl.request);
router.post('/accept/:id', middlewareJWT, FriendsCtrl.accept);
router.post('/reject/:id', middlewareJWT, FriendsCtrl.reject);

export default router;
