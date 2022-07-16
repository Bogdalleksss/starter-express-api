import { model, Schema, Document, Types } from 'mongoose';

export interface PostModelInterface {
  author_type: number;
  author: Types.ObjectId;
  article?: String;
  views_count?: number;
  likes?: Array<Types.ObjectId>
}


export type PostModelDocumentInterface = PostModelInterface & Document;

const PostSchema = new Schema<PostModelInterface>({
  author_type: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    refPath: 'author_type',
    type: Types.ObjectId,
  },
  article: String,
  views_count: {
    type: Number,
    default: 0,
  },
  likes: [{
    ref: 'Like',
    type: Types.ObjectId,
  }],
}, { timestamps: true })

export const PostModel = model<PostModelDocumentInterface>('Post', PostSchema);
