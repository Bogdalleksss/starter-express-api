import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const postValidation = [
  body('author_type', 'author_type не указан')
    .isString(),

  validationCheck
]
