import express from 'express';
import { passport } from "../core/passport";
import UserCtrl from "../controllers/UserController";
import { signupValidation } from "../validations/signup";
import { verifyValidation } from "../validations/verify";
import {
  recoveryPasswordValidation,
  recoveryValidation,
  recoveryVerifyValidation
} from "../validations/recovery";
import { middlewareJWT } from "../middleware";

const localMiddleware = passport.authenticate('local', { session: false });

const router = express.Router();

router.post('/', localMiddleware, UserCtrl.auth);
router.get('/me', middlewareJWT, UserCtrl.me);
router.post('/signup', signupValidation, UserCtrl.create);
router.post('/verify', verifyValidation, UserCtrl.verify);
router.post('/send-code', recoveryValidation, UserCtrl.sendCode);
router.post('/confirm-code', recoveryVerifyValidation, UserCtrl.confirmCode);
router.post('/recovery/password', recoveryPasswordValidation, UserCtrl.recoveryPassword);

export default router;
