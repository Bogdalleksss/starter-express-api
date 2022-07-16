import express from 'express';

import { middlewareJWT } from "../middleware";
import AlbumCtrl from "../controllers/AlbumController";
import { albumsEditValidation, albumsValidation } from "../validations/albums";

const router = express.Router();

router.get('/', middlewareJWT, AlbumCtrl.index);
router.get('/:id', middlewareJWT, AlbumCtrl.show);
router.post('/', middlewareJWT, albumsValidation, AlbumCtrl.create);
router.patch('/:id', middlewareJWT, albumsEditValidation, AlbumCtrl.edit);
router.get('/media/:id', middlewareJWT, AlbumCtrl.media);

export default router;
