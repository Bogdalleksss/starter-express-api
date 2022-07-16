import express from "express";
import { UserModelDocumentInterface } from "../models/UserModel";

export const userCheck = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const user = req.user as UserModelDocumentInterface;

  if (!user) {
    res.status(404).json({
      status: 'error',
      message: 'Пользователь не найден'
    });
    return;
  }

  next();
}
