import express from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserModel, UserModelDocumentInterface, UserModelInterface } from "../models/UserModel";
import { VerifyModel, VerifyModelInterface } from "../models/VerifyModel";
import { sendMail } from "../utils/sendMail";

const isValidObjectId = mongoose.Types.ObjectId.isValid;

const createVerify = async () => {
  const verify_code = Math.floor(100000 + Math.random() * 900000);

  const verify_data: VerifyModelInterface = {
    type: 1,
    code: verify_code,
  }

  return await VerifyModel.create(verify_data);
}

class UserController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();

      res.status(200).json({
        status: 'success',
        data: users,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return
      }

      const user = await UserModel.findById(userId).exec();

      if (!user) {
        res.status(404).send();
        return;
      }

      res.status(200).json({
        status: 'success',
        data: user,
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
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const data: UserModelInterface = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        username: req.body.username,
        password: hashedPassword,
        sex: req.body.sex,
        confession: req.body.confession,
        location: req.body.location,
        date_birth: new Date(req.body.date_birth),
        avatar: req.body.avatar || '',
        confirmed: req.body.confirmed,
      }

      const user = await UserModel.create(data);

      res.status(200).json({
        status: 'success',
        data: user,
      })

    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async verify(req: express.Request, res: express.Response): Promise<void> {
    try {
      const confirm_data = await VerifyModel.findOne({ user_id: req.body.user_id }).exec();

      if (confirm_data?.code === req.body.verify_code) {
        const user = await UserModel.findOne({ _id: req.body.user_id }).exec();

        if (!user) {
          res.status(404).send();
          return;
        }

        user.confirmed = true;
        user.confirmed_at = new Date();

        user.update();

        res.status(200).json({
          status: 'success',
          data: {
            message: 'Почта подтверждена'
          }
        })

        await VerifyModel.deleteOne({ user_id: req.body.user_id })
      } else {
        res.status(422).json({
          status: 'error',
          message: 'Код подтверждения не верный',
        });
      }

    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async auth(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      res.status(200).json({
        status: 'success',
        data: {
          ...user,
          token: jwt.sign(
            { data: req.user },
            process.env.SECRET_KEY || 'secret',
            {
              expiresIn: '30d'
            }
          ),
        }
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async me(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      res.status(200).json({
        status: 'success',
        data: user
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async sendCode(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = await UserModel.findOne({ email: req.body.email }).exec();

      let emailTitle = 'Подтверждение пароля';
      let emailText = 'подтверждения';

      if (user) {
        emailTitle = 'Восстановление пароля';
        emailText = 'восстановления';
      }

      const verify = await createVerify();

      sendMail({
        to: req.body.email,
        subject: `${emailTitle}. Church - Социальная сеть`,
        html: `Код ${emailText} <b>${verify.code}</b>`,
        callback: (err: Error | null) =>  {
          if (err) {
            res.status(401).json({
              status: 'error',
              message: JSON.stringify(err),
            })
          }
        }
      })

      res.status(200).json({
        status: 'success',
        data: {
          verify_id: verify._id,
        }
      });

    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async confirmCode(req: express.Request, res: express.Response): Promise<void> {
    try {
      const confirm_data = await VerifyModel.findById(req.body.verify_id).exec();

      if (confirm_data?.code === req.body.verify_code) {
        res.status(200).json({
          status: 'success',
          data: {
            confirmed: true,
            message: 'Почта подтверждена'
          }
        })

        await VerifyModel.deleteOne({ _id: req.body.verify_id })
      } else {
        res.status(422).json({
          status: 'error',
          message: 'Код подтверждения не верный',
        });
      }

    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async recoveryPassword(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = await UserModel.findById(req.body.user_id).exec();

      if (!user) {
        res.status(404).json({
          status: 'error',
          message: `User not found`
        });

        return;
      }

      user.password = await bcrypt.hash(req.body.password, 10);

      user.update();

      res.status(200).json({
        status: 'success',
        data: {
          ...user,
          token: jwt.sign(
            { data: user },
            process.env.SECRET_KEY || 'secret',
            {
              expiresIn: '30d'
            }
          ),
        }
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }
}

export default new UserController();
