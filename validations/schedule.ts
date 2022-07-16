import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const scheduleValidation = [
  body('name', 'Имя не указано')
    .isString(),

  body('start_time', 'Время начала не указанно')
    .isString(),

  body('end_time', 'Время завершения не указанно')
    .isString(),

  body('day', 'День проведения служения не указаны')
    .isNumeric().withMessage('День проведения служения указанны не корректно'),

  body('church_id', 'ID церкви не указанно')
    .isString(),

  validationCheck,
]
