import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const commentValidation = [
  body('source_type', 'source_type не указан')
    .isString(),

  body('source', 'source не указан')
    .isString(),

  body('comment', 'comment не указан')
    .isString(),

  body('user_reply', 'source_type не указан')
    .isString(),

  validationCheck,
]

export const commentEditValidation = [
  body('comment', 'comment не указан')
    .isString(),

  validationCheck,
]
