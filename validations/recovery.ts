import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const recoveryValidation = [
  body('email', 'Email не указан')
    .isString(),

  validationCheck,
]

export const recoveryVerifyValidation = [
  body('verify_id', 'verify_id не указан')
    .isString(),

  body('verify_code', 'Код восстановления не указан')
    .isFloat({ min: 100000, max: 900000}).withMessage('Код подтверждения указан неверно'),

  validationCheck,
]

export const recoveryPasswordValidation = [
  body('user_id', 'user_id не указан')
    .isString(),

  body('password', 'Пароль не указан')
    .isString()
    .custom((value, { req }) => {
      if (value != req.body.password_confirm) {
        throw new Error('Пароли не совпадают');
      } else {
        return value;
      }
    }),

  validationCheck,
]
