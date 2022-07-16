import { model, Schema, Document, Types } from 'mongoose';

export interface MediaModelInterface {
  source_type?: string;
  source?: Types.ObjectId;
  format: string;
  url: string;
  key: string;
}

export type MediaModelDocumentInterface = MediaModelInterface & Document;

const MediaSchema = new Schema<MediaModelInterface>({
  source_type: String,
  source: {
    refPath: 'source_type',
    type: Types.ObjectId,
  },
  format: {
    required: true,
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
  key: {
    required: true,
    type: String,
  },
}, { timestamps: true })

export const MediaModel = model<MediaModelDocumentInterface>('Media', MediaSchema);
