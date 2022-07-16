import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const moderationValidation = [
  body('type.id', 'ID типа модерации не указан')
    .isNumeric().withMessage('ID типа модерации указано не корректно'),

  body('type.slug', 'Slug типа модерации не указан')
    .isString(),

  validationCheck,
]

export const moderationConfirmValidation = [
  body('role.id', 'ID роли не указан')
    .isNumeric().withMessage('ID роли указано не корректно'),

  body('role.slug', 'Slug роли не указан')
    .isString(),

  validationCheck,
]
