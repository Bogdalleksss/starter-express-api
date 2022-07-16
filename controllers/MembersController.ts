import express from "express";
import { ModerationModel, ModerationModelInterface } from "../models/ModerationModel";
import { UserModel, UserModelDocumentInterface } from "../models/UserModel";

class MembersController {
  async request(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      const requestOnModeration = await ModerationModel.findOne({
        user: user.id,
        type: req.body.type
      }).exec();

      if (requestOnModeration) {
        res.status(200).json({
          status: 'success',
          data: {
            message: "Заявка уже на рассмотрении"
          }
        });
        return;
      }

      if (req.body.type.id === 2 && user.church) {
        res.status(200).json({
          status: 'success',
          data: {
            message: "Пользователь уже является членом церкви"
          }
        });
        return;
      }

      const data: ModerationModelInterface = {
        user: user.id,
        ...req.body,
      };

      const moderationRequest = await ModerationModel.create(data);

      res.status(200).json({
        status: 'success',
        data: {
          request_data: moderationRequest,
          message: 'Заявка отправлена на рассмотрение',
        },
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }

  async confirm(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      const moderation = await ModerationModel.findById(req.params.id).exec();

      if (!moderation) {
        res.status(404).json({
          status: 'error',
          message: 'Заявки не существует'
        });
        return;
      }

      if (moderation.type.id === 2 && !req.body.church) {
        res.status(422).json({
          status: 'error',
          message: 'Поле church обязательно для заполнения'
        });
        return;
      }

      if (moderation.status.id === 1) {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'Заявка уже подтверждена'
          }
        });
        return;
      }

      moderation.status = {
        id: 1,
        slug: 'SUCCESS'
      }

      await moderation.save();

      const userUpdate = await UserModel.findByIdAndUpdate(user._id, req.body, { new: true }).exec();

      res.status(200).json({
        status: 'success',
        data: userUpdate,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const members = await UserModel.find({ church: req.params.id });

      res.status(200).json({
        status: 'success',
        data: members,
      });

    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }
}

export default new MembersController();
