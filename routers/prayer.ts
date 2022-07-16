import express from 'express';
import PrayerCtrl from "../controllers/PrayerController";
import { middlewareJWT } from "../middleware";
import { prayerValidation, prayerEditValidation } from "../validations/prayer";

const router = express.Router();

router.get('/', middlewareJWT, PrayerCtrl.index);
router.post('/', middlewareJWT, prayerValidation, PrayerCtrl.create);
router.patch('/:id', middlewareJWT, prayerEditValidation, PrayerCtrl.edit);
router.delete('/:id', middlewareJWT, PrayerCtrl.delete);

export default router;
