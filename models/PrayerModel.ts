import { model, Schema, Document, Types } from 'mongoose';

export interface PrayerModelInterface {
  user: Types.ObjectId;
  status?: {
    type: number; // 0, 1, 2
    slug: {
      ru: string; // В нужде, Срочно, Бог ответил
      en: string; // In need, Urgently, God answered
    };
  }
  need: string;
  views_count?: number;
}

export type PrayerModelDocumentInterface = PrayerModelInterface & Document;

const PrayerSchema = new Schema<PrayerModelInterface>({
  user: {
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: {
      required: true,
      type: Number,
      default: 0,
    },
    slug: {
      ru: {
        required: true,
        type: String,
        default: 'В нужде'
      },
      en: {
        required: true,
        type: String,
        default: 'In need'
      },
    },
  },
  need: {
    required: true,
    type: String,
  },
  views_count: {
    type: Number,
    default: 0,
  },
}, { timestamps: true })

export const PrayerModel = model<PrayerModelDocumentInterface>('Prayer', PrayerSchema);
