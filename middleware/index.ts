import { passport } from "../core/passport";
import { userCheck } from "./userMiddleware";

const jwtMiddleware = passport.authenticate('jwt', { session: false });

export const middlewareJWT = [jwtMiddleware, userCheck];
