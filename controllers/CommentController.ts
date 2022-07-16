import express from "express";
import { CommentModel, CommentModelInterface } from "../models/CommentModel";
import { UserModelDocumentInterface } from "../models/UserModel";

class CommentController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const comments = await CommentModel.find({ source: req.params.id }).exec();

      res.status(200).json({
        status: 'success',
        data: comments,
      })
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

      const data: CommentModelInterface = {
        source_type: req.body.source_type,
        source: req.body.source,
        author: user._id,
        comment: req.body.comment,
        user_reply: req.body.user_reply,
      }

      const comment = await CommentModel.create(data);

      res.status(200).json({
        status: 'success',
        data: comment,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async edit (req: express.Request, res: express.Response): Promise<void> {
    try {
      const comment = await CommentModel.findById(req.params.id);

      if (!comment) {
        res.status(404).json({
          status: 'error',
          message: "Комментарий не найден"
        });
        return;
      }

      comment.comment = req.body.comment;

      comment.save();

      res.status(200).json({
        status: 'success',
        data: comment,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }
}


export default new CommentController();
