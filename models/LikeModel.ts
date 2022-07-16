import { model, Schema, Document, Types } from 'mongoose';

export interface LikeModelInterface {
  source_type?: string;
  source: Types.ObjectId;
  author: Types.ObjectId;
}

export type LikeModelDocumentInterface = LikeModelInterface & Document;

const LikeSchema = new Schema<LikeModelInterface>({
  source_type: {
    required: true,
    type: String,
    default: 'Post'
  },
  source: {
    required: true,
    refPath: 'source_type',
    type: Types.ObjectId,
  },
  author: {
    required: true,
    ref: 'User',
    type: Types.ObjectId,
  }
}, { timestamps: true })

export const LikeModel = model<LikeModelDocumentInterface>('Like', LikeSchema);
