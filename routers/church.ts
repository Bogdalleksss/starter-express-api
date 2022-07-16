import express from 'express';

import ChurchCtrl from "../controllers/ChurchController";
import { churchValidation } from "../validations/church";
import { middlewareJWT } from "../middleware";

const router = express.Router();

router.post('/', middlewareJWT, churchValidation, ChurchCtrl.create);
router.get('/:id', middlewareJWT, ChurchCtrl.show);

export default router;
