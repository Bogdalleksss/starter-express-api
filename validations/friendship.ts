import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const friendshipValidation = [
  body('recipient_id', 'recipient_id не указан')
    .isString(),

  validationCheck,
]
