import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const signupValidation = [
  body('email', 'Введите e-mail')
    .isEmail().withMessage('Не корректный e-mail')
    .isLength({
      min: 4,
      max: 40,
    }).withMessage('Допустимое количество символов от 4 до 40'),

  body('first_name', 'Введите e-mail')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    }).withMessage('Допустимое количество символов от 2 до 40'),

  body('last_name', 'Введите e-mail')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    }).withMessage('Допустимое количество символов от 2 до 40'),

  body('phone', 'Некорректный номер телефона')
    .escape()
    .exists({checkFalsy: true})
    .isLength({min: 11, max:12})
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),

  body('username', 'Введите username')
    .isString()
    .isLength({
      min: 6,
      max: 16,
    }).withMessage('Допустимое количество символов от 6 до 16'),

  body('password', 'Введите пароль')
    .isString()
    .isLength({
      min: 6,
    }).withMessage('Минимальная длинна пароля 6 символов')
    .custom((value, { req }) => {
      if (value != req.body.password_confirm) {
        throw new Error('Пароли не совпадают');
      } else {
        return value;
      }
    }),

  body('location.city', 'Укажите город')
    .isString(),

  body('location.country', 'Укажите страну')
    .isString(),

  body('sex.slug', 'Выберите пол')
    .isString(),
  body('sex.type', 'Выберите пол')
    .isNumeric(),

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

  body('date_birth', 'Укажите дату рождения')
    .isString(),

  validationCheck,
]
