import express from 'express';
import { scheduleValidation } from "../validations/schedule";
import ScheduleCtrl from "../controllers/ScheduleController";
import { middlewareJWT } from "../middleware";

const router = express.Router();

router.post('/', middlewareJWT, scheduleValidation, ScheduleCtrl.create);
router.get('/', middlewareJWT, ScheduleCtrl.show);
router.patch('/:id', middlewareJWT, scheduleValidation, ScheduleCtrl.edit);
router.delete('/:id', middlewareJWT, ScheduleCtrl.delete);

export default router;
