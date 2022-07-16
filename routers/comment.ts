import express from 'express';

import { middlewareJWT } from "../middleware";
import CommentCtrl from "../controllers/CommentController";
import { commentEditValidation, commentValidation } from "../validations/comments";

const router = express.Router();

router.post('/', middlewareJWT, commentValidation, CommentCtrl.create);
router.get('/:id', middlewareJWT, CommentCtrl.index);
router.patch('/:id', middlewareJWT, commentEditValidation, CommentCtrl.edit);

export default router;
