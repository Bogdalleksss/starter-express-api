import {model, Schema, Document, Types} from 'mongoose';

export interface ScheduleModelInterface {
  name: string;
  start_time: Date;
  end_time: Date;
  church: Types.ObjectId;
  day: number;
}

export type ScheduleModelDocumentInterface = ScheduleModelInterface & Document;

const ScheduleSchema = new Schema<ScheduleModelInterface>({
  name: {
    required: true,
    type: String,
  },
  start_time: {
    required: true,
    type: Date,
  },
  end_time: {
    required: true,
    type: Date,
  },
  church: {
    required: true,
    type: Types.ObjectId,
    ref: 'Church',
  },
  day: {
    required: true,
    type: Number,
  },
}, { timestamps: true })

export const ScheduleModel = model<ScheduleModelDocumentInterface>('Schedule', ScheduleSchema);
