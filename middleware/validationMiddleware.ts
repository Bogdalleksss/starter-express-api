import express from "express";
import { validationResult } from "express-validator";

export const validationCheck = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({
      status: 'error',
      message: errors.array()
    });

    return;
  }

  next();
}
