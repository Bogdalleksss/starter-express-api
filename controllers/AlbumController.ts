import express from "express";
import { AlbumModel, AlbumModelInterface } from "../models/AlbumModel";
import { MediaModel } from "../models/MediaModel";

class AlbumController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const albums = await AlbumModel.find({ source: req.body.source_id }).exec();

      res.status(200).json({
        status: 'success',
        data: albums,
      });
    } catch(err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const data: AlbumModelInterface = {
        source_type: req.body.source_type || 'Church',
        source: req.body.source_id,
        name: req.body.name,
        cover: req.body.cover,
        type: req.body.type,
      }

      const album = await AlbumModel.create(data);

      res.status(200).json({
        status: 'success',
        data: album,
      });
    } catch(err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const album = await AlbumModel.findById(req.params.id).exec();

      if (!album) {
        res.status(404).json({
          status: 'error',
          message: 'Альбом не был найден',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: album,
      });
    } catch(err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async edit(req: express.Request, res: express.Response): Promise<void> {
    try {
      const album = await AlbumModel.findById(req.params.id).exec();

      if (!album) {
        res.status(404).json({
          status: 'error',
          message: 'Альбом не был найден',
        });
        return;
      }

      album.cover = req.body.cover || album.cover;
      album.name = req.body.name || album.name;
      album.type = req.body.type || album.type;

      await album.save();

      res.status(200).json({
        status: 'success',
        data: album,
      });
    } catch(err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }

  async media(req: express.Request, res: express.Response): Promise<void> {
    try {
      const media = await MediaModel.find({ source: req.params.id }).exec();

      res.status(200).json({
        status: 'success',
        data: media,
      });
    } catch(err) {
      res.status(500).json({
        status: 'error',
        message: err,
      });
    }
  }
}

export default new AlbumController();
