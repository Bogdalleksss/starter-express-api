import { model, Schema, Document, Types } from 'mongoose';

export interface AlbumModelInterface {
  source_type: string,
  source: Types.ObjectId;
  cover: string;
  name: string;
  type: string;
}

export type AlbumModelDocumentInterface = AlbumModelInterface & Document;

const AlbumSchema = new Schema<AlbumModelInterface>({
  source_type: {
    required: true,
    type: String,
  },
  source: {
    required: true,
    refPath: 'source_type',
    type: Types.ObjectId,
  },
  name: {
    required: true,
    type: String,
  },
  cover: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
}, { timestamps: true })

export const AlbumModel = model<AlbumModelDocumentInterface>('Album', AlbumSchema);
