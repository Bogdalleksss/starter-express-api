import express from 'express';

import PostCtrl from "../controllers/PostController";
import { postValidation } from "../validations/post";
import { middlewareJWT } from "../middleware";

const router = express.Router();

router.get('/', middlewareJWT, PostCtrl.index);
router.post('/', middlewareJWT, postValidation, PostCtrl.create);
router.get('/:id', middlewareJWT, PostCtrl.show);
router.patch('/:id', middlewareJWT, PostCtrl.edit);
router.delete('/:id', middlewareJWT, PostCtrl.delete);
router.post('/like/:id', middlewareJWT, PostCtrl.like);
router.post('/dislike/:id', middlewareJWT, PostCtrl.dislike);

export default router;
