import { model, Schema, Document, Types } from 'mongoose';

export interface ModerationModelInterface {
  type: {
    id: number; // 1, 2
    slug: string; // PASTORATE, MEMBERSHIP
  },
  user: Types.ObjectId;
  church?: Types.ObjectId;
  document_url?: string,
  status: {
    id: number; // 0, 1, 2, 3
    slug: string; // WAITING, SUCCESS, SEND_ON_EDIT, CANCELED
  }
}

export type ModerationModelDocumentInterface = ModerationModelInterface & Document;

const ModerationSchema = new Schema<ModerationModelInterface>({
    type: {
      id: {
        required: true,
        type: Number,
      },
      slug: {
        required: true,
        type: String,
      },
    },
    document_url: String,
    church: Types.ObjectId,
    user: {
      required: true,
      type: Types.ObjectId,
    },
    status: {
      id: {
        required: true,
        type: Number,
        default: 0,
      },
      slug: {
        required: true,
        type: String,
        default: 'WAITING',
      },
    },
}, { timestamps: true })

export const ModerationModel = model<ModerationModelDocumentInterface>('Moderation', ModerationSchema);
