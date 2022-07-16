import express from "express";
import { PostModel, PostModelInterface } from "../models/PostModel";
import { UserModelDocumentInterface } from "../models/UserModel";
import { LikeModel, LikeModelInterface } from "../models/LikeModel";

class MembersController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      const posts = await PostModel.find({
        $or: [
          { author: user.church },
          { author: { $in: user.friends } },
        ]
      })
        .sort([['createdAt', -1]])
        .exec();

      res.status(200).json({
        status: 'success',
        data: posts,
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

      if (req.body.author_type === 'Church' && user.role?.type !== 1) {
        res.status(403).json({
          status: 'error',
          message: 'у вас нет прав на создание поста',
        });
      }

      const data: PostModelInterface = {
        author_type: req.body.author_type,
        author: req.body.author_id,
        article: req.body.article || '',
      };

      const post = await PostModel.create(data);

      res.status(200).json({
        status: 'success',
        data: post,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const post = await PostModel.findById(req.params.id).populate('author').exec();

      if (!post) {
        res.status(404).json({
          status: 'error',
          message: 'Пост не найден',
        });

        return;
      }

      res.status(200).json({
        status: 'access',
        data: post,
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
      const post = await PostModel.findById(req.params.id).exec();

      if (!post) {
        res.status(404).json({
          status: 'error',
          message: 'Пост не найден',
        });

        return;
      }

      post.article = req.body.article;

      await post.save();

      res.status(200).json({
        status: 'success',
        data: post,
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
      await PostModel.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: 'success',
        data: {
          message: 'Пост удален успешно!',
        },
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async like(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;
      const post = await PostModel.findById(req.params.id).exec();

      if (!post) {
        res.status(404).json({
          status: 'error',
          message: 'Пост не найден',
        });
        return;
      }

      const isLike = post.likes?.find(like => user._id.equals(like));

      if (isLike) {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'Лайк уже поставлен'
          },
        })
        return;
      }

      const data: LikeModelInterface = {
        source: post._id,
        author: user._id,
      }

      post.likes?.push(user._id);

      await LikeModel.create(data);
      await post.save();

      res.status(200).json({
        status: 'success',
        data: post,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async dislike(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;
      const post = await PostModel.findById(req.params.id).exec();

      if (!post) {
        res.status(404).json({
          status: 'error',
          message: 'Пост не найден',
        });
        return;
      }

      const like = await LikeModel.findOne({ author: user._id, source: post._id }).exec();

      if (!like) {
        res.status(404).json({
          status: 'error',
          message: 'Лайк не был поставлен',
        });
        return;
      }

      post.likes = post.likes?.filter(user_like => !user._id.equals(user_like));

      await post.save();
      await like.delete();

      res.status(200).json({
        status: 'success',
        data: post,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }
}


export default new MembersController();
