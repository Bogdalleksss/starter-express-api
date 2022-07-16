import express from 'express';
import MembersCtrl from "../controllers/MembersController";
import { moderationConfirmValidation, moderationValidation } from "../validations/moderation";
import { middlewareJWT } from "../middleware";

const router = express.Router();

router.post('/request', middlewareJWT, moderationValidation, MembersCtrl.request);
router.patch('/confirm/:id', middlewareJWT, moderationConfirmValidation, MembersCtrl.confirm);
router.get('/:id', middlewareJWT, MembersCtrl.show);

export default router;
