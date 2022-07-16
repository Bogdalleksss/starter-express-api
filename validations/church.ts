import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const churchValidation = [
  body('location.city', 'Укажите город')
    .isString(),

  body('location.country', 'Укажите страну')
    .isString(),

  body('confession', 'Укажите конфессию')
    .isObject().withMessage('Некорректно указанна конфессия'),

  body('confession.name.ru', 'Укажите конфессию')
    .isString(),

  body('confession.name.en', 'Укажите конфессию')
    .isString(),

  body('confession.short_name.ru', 'Укажите конфессию')
    .isString(),

  body('confession.short_name.en', 'Укажите конфессию')
    .isString(),

  body('confession.type', 'Укажите конфессию')
    .isNumeric(),

  validationCheck,
];
