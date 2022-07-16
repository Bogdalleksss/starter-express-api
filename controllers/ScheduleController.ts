import express from "express";
import { ScheduleModel, ScheduleModelInterface } from "../models/ScheduleModel";

class MembersController {
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const data:ScheduleModelInterface = {
        name: req.body.name,
        church: req.body.church_id,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        day: req.body.day,
      };

      const schedule = await ScheduleModel.create(data);

      res.status(200).json({
        status: 'success',
        data: schedule,
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
      const schedule = await ScheduleModel.find({ church: req.body.church_id }).exec();

      if (!schedule) {
        res.status(404).json({
          status: 'error',
          message: 'Расписание не найдено',
        });

        return;
      }

      res.status(200).json({
        status: 'access',
        data: schedule,
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
      const schedule = await ScheduleModel.findById(req.params.id).exec();

      if (!schedule) {
        res.status(404).json({
          status: 'error',
          message: 'Расписание не найден',
        });

        return;
      }

      schedule.name = req.body.name;
      schedule.start_time = req.body.start_time;
      schedule.end_time = req.body.end_time;
      schedule.day = req.body.day;

      await schedule.save();

      res.status(200).json({
        status: 'success',
        data: schedule,
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
      await ScheduleModel.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: 'success',
        data: {
          message: 'Расписание удалено успешно!',
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

export default new MembersController();
