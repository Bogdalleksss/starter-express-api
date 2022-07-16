import express from "express";
import { fileDelete, fileUpload } from "../utils/upload";
import { MediaModel, MediaModelInterface } from "../models/MediaModel";

class UploadsController {
  async upload(req: express.Request, res: express.Response): Promise<void> {
    try {
      const file = req.file;

      if (!file) {
        res.status(422).json({
          status: 'error',
          message: 'Файл отсутствует',
        });
        return;
      }

      const uploaded: any = await fileUpload(file);

      const data: MediaModelInterface = {
        source_type: req.body.source_type,
        source: req.body.source,
        format: uploaded.format,
        url: uploaded.Location,
        key: uploaded.Key,
      }

      const media = await MediaModel.create(data);

      res.status(200).json({
        status: 'success',
        data: media
      })

    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }

  async uploadMultiple(req: express.Request, res: express.Response): Promise<void> {
    try {
      const files: any = req.files;

      if (!files) {
        res.status(422).json({
          status: 'error',
          message: 'Файлы отсутствует',
        });
        return;
      }

      const media: object[] = await Promise.all(files.map(async (file: Express.Multer.File): Promise<object> => {
        const uploaded: any = await fileUpload(file);
        const data: MediaModelInterface = {
          source_type: req.body.source_type,
          source: req.body.source,
          format: uploaded.format,
          url: uploaded.Location,
          key: uploaded.Key,
        }

        return await MediaModel.create(data);
      }));

      res.status(200).json({
        status: 'success',
        data: media,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      const media: any = await MediaModel.findById(req.params.id).exec();

      if (!media) {
        res.status(422).json({
          status: 'error',
          message: 'Файл отсутствует',
        });
        return;
      }

      const deleted: any = await fileDelete(media.key);
      media.delete();

      res.status(200).json(deleted)
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err,
      })
    }
  }
}

export default new UploadsController();
