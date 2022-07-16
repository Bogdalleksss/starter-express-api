import express from 'express';

import { middlewareJWT } from "../middleware";
import UploadsCtrl from "../controllers/UploadsController";
import multer from "multer";

const router = express.Router();

const upload = multer({});

router.post('/', middlewareJWT, upload.single('file'), UploadsCtrl.upload);
router.delete('/:id', middlewareJWT, UploadsCtrl.delete);
router.post('/files', middlewareJWT, upload.array('files'), UploadsCtrl.uploadMultiple);

export default router;
