import express from "express";
import { UserModel, UserModelDocumentInterface } from "../models/UserModel";
import { ChurchModel, ChurchModelInterface } from "../models/ChurchModel";


class ChurchController {
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as  UserModelDocumentInterface;

      if (user.role?.type !== 1) {
        res.status(400).json({
          status: 'error',
          message: 'Пользователь не имеет статус пастора',
        });
        return;
      }

      if (user.church) {
        res.status(400).json({
          status: 'error',
          message: 'Пользователь уже имеет созданную церковь',
        });
        return;
      }

      const data: ChurchModelInterface = {
        user: user._id,
        confession: req.body.confession,
        avatar: req.body.avatar || '',
        cover: req.body.cover || '',
        location: req.body.location,
      }

      const church = await ChurchModel.create(data);

      await UserModel.findByIdAndUpdate(
        user?._id,
        { church: church._id },
        { new: true }
      ).exec();

      res.status(200).json({
        status: 'success',
        data: church,
      });

    } catch(err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const church = await ChurchModel.findById(req.params.id).exec();

      if (!church) {
        res.status(404).json({
          status: 'error',
          message: 'Церковь не найдена',
        });
        return;
      }

      res.status(200).json({
        status: 'access',
        data: church,
      });

    } catch(err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }
}

export default new ChurchController();
