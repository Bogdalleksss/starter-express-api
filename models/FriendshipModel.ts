import { model, Schema, Document, Types } from 'mongoose';

export interface FriendshipModelInterface {
  requester: Types.ObjectId;
  recipient: Types.ObjectId;
  status?: {
    type: number; // 0, 1
    slug: string; // REQUESTED, ACCEPTED
  };
}

export type FriendshipModelDocumentInterface = FriendshipModelInterface & Document;

const FriendshipSchema = new Schema<FriendshipModelInterface>({
  requester: {
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  },
  recipient: {
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
      required: true,
      type: String,
      default: 'REQUESTED'
    },
  },
}, { timestamps: true })

export const FriendshipModel = model<FriendshipModelDocumentInterface>('Friendship', FriendshipSchema);
