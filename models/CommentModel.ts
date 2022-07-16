import { model, Schema, Document, Types } from 'mongoose';

export interface CommentModelInterface {
  source_type: string;
  source: Types.ObjectId;
  author: Types.ObjectId;
  comment: string;
  user_reply?: Types.ObjectId;
}

export type CommentModelDocumentInterface = CommentModelInterface & Document;

const CommentSchema = new Schema<CommentModelInterface>({
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
  },
  user_reply: {
    ref: 'User',
    type: Types.ObjectId,
  },
  comment: {
    required: true,
    type: String,
  },
}, { timestamps: true })

export const CommentModel = model<CommentModelDocumentInterface>('Comment', CommentSchema);
