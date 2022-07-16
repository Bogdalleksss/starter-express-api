import express from "express";
import { UserModel, UserModelDocumentInterface } from "../models/UserModel";
import { FriendshipModel, FriendshipModelInterface } from "../models/FriendshipModel";

class FriendshipController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      const friends = await UserModel.find({
        '_id': { $in: user.friends }
      })
        .limit(1)
        .exec();

      res.status(200).json({
        status: 'success',
        data: friends,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }

  async request(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      const friendship = await FriendshipModel.findOne({
        requester: user.id,
        recipient: req.body.recipient_id
      }).exec();

      if (friendship) {
        if (friendship.status?.type === 1) {
          res.status(200).json({
            status: 'success',
            data: {
              message: "Заявка уже принята"
            }
          });
          return;
        }

        res.status(200).json({
          status: 'success',
          data: {
            message: "Заявка уже была отправлена"
          }
        });
        return;
      }

      const data: FriendshipModelInterface = {
        requester: user._id,
        recipient: req.body.recipient_id,
      };

      const friendshipRequest = await FriendshipModel.create(data);

      res.status(200).json({
        status: 'success',
        data: {
          request_data: friendshipRequest,
          message: 'Заявка отправлена',
        },
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }

  async accept(req: express.Request, res: express.Response): Promise<void> {
    try {
      const friendship = await FriendshipModel.findById(req.params.id).exec();

      if (!friendship) {
        res.status(404).json({
          status: 'error',
          message: 'Заявка не была отправлена'
        });
        return;
      }

      const userRequester = await UserModel.findById(friendship.requester).exec();
      const userRecipient = await UserModel.findById(friendship.recipient).exec();

      if (!userRequester || !userRecipient) {
        res.status(404).json({
          status: 'error',
          message: 'Заявка не валидна'
        });
        return;
      }

      if (userRequester._id.equals(userRecipient._id)) {
        res.status(403).json({
          status: 'error',
          message: 'Нельзя принять запрос от самих себя'
        });
        return;
      }

      userRequester.friends?.push(userRecipient._id);
      userRecipient.friends?.push(userRequester._id);

      await userRequester.save();
      await userRecipient.save();

      friendship.status = {
        type: 1,
        slug: 'ACCEPTED'
      }

      await friendship.save();

      res.status(404).json({
        status: 'success',
        data: friendship
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }

  async reject(req: express.Request, res: express.Response): Promise<void> {
    try {
      const friendship = await FriendshipModel.findById(req.params.id).exec();

      if (!friendship) {
        res.status(404).json({
          status: 'error',
          message: 'Заявка не была отправлена'
        });
        return;
      }

      await friendship.delete();

      res.status(404).json({
        status: 'success',
        data: {
          message: 'Запрос отклонен'
        }
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }
}

export default new FriendshipController();
