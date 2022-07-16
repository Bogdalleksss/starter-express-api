import { body } from 'express-validator';
import { validationCheck } from "../middleware/validationMiddleware";

export const albumsValidation = [
  body('name', 'Имя альбома не указано')
    .isString(),

  body('cover', 'Обложка не загружена')
    .isString(),

  body('type', 'Не указан тип альбома')
    .isString(),

  body('source_id', 'source_id не указан')
    .isString(),

  validationCheck,
]


export const albumsEditValidation = [
  body('name', 'Имя альбома не указано')
    .isString(),

  body('cover', 'Обложка не загружена')
    .isString(),

  body('type', 'Не указан тип альбома')
    .isString(),

  validationCheck,
]
