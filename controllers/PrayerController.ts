import express from "express";
import { PrayerModel, PrayerModelInterface } from "../models/PrayerModel";
import { UserModelDocumentInterface } from "../models/UserModel";

class PrayerController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const prayers = await PrayerModel.find({}).populate('user').exec();

      res.status(200).json({
        status: 'access',
        data: prayers,
      });

    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      const data:PrayerModelInterface = {
        user: user.id,
        need: req.body.need,
      };

      const prayer = await PrayerModel.create(data);

      res.status(200).json({
        status: 'success',
        data: prayer,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async edit(req: express.Request, res: express.Response): Promise<void> {
    try {
      const prayer = await PrayerModel.findById(req.params.id).exec();
      const user = req.user as UserModelDocumentInterface;

      if (!prayer) {
        res.status(404).json({
          status: 'error',
          message: 'Молитвенная нужда не найдена',
        });

        return;
      }

      if (!prayer.user.equals(user._id)) {
        res.status(403).json({
          status: 'error',
          message: 'У вас нет прав на изменение данной молитвенной нужды',
        });

        return;
      }

      prayer.need = req.body.need;
      prayer.status = req.body.status;

      await prayer.save();

      res.status(200).json({
        status: 'success',
        data: prayer,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;
      const prayer = await PrayerModel.findById(req.params.id).exec();

      if (!prayer) {
        res.status(404).json({
          status: 'error',
          message: 'Молитвенная нужда не найдена',
        });

        return;
      }

      if (!prayer.user.equals(user._id)) {
        res.status(403).json({
          status: 'error',
          message: 'У вас нет прав на изменение данной молитвенной нужды',
        });

        return;
      }

      prayer.delete();

      res.status(200).json({
        status: 'success',
        data: {
          message: 'Молитвенная нужда удалена успешно!',
        },
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }
}

export default new PrayerController();
