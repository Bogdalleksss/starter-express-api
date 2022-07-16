import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const prayerValidation = [
  body('need', 'Молитвенная нужда не указанна')
    .isString(),

  validationCheck,
]

export const prayerEditValidation = [
  body('need', 'Молитвенная нужда не указанна')
    .isString(),

  body('status.type', 'Статус не указан')
    .isFloat({ min: 0, max: 2 }).withMessage('Указан не существующий статус'),

  body('status.slug.ru', 'Статус не указан')
    .isString(),

  body('status.slug.en', 'Статус не указан')
    .isString(),

  validationCheck,
]
