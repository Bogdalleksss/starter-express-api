import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const verifyValidation = [
  body('user_id', 'user_id не указан')
    .isString(),

  body('verify_code', 'Не указан код подтверждения')
    .isFloat({ min: 100000, max: 900000}).withMessage('Код подтверждения указан неверно'),

  validationCheck,
]
