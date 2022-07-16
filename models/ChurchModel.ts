import { model, Schema, Document, Types } from 'mongoose';

export interface ChurchModelInterface {
  user: Types.ObjectId,
  confession: {
    type: number;
    name: {
      ru: string;
      en: string;
    };
    short_name: {
      ru: string;
      en: string;
    };
  };
  avatar?: string;
  cover?: string;
  schedule?: Types.Array<object>;
  members_count?: number;
  location: {
    country: string;
    city: string;
    zip: string;
    street: string;
  };
}

export type ChurchModelDocumentInterface = ChurchModelInterface & Document;

const ChurchSchema = new Schema<ChurchModelInterface>({
  user: {
    required: true,
    ref: 'User',
    type: Types.ObjectId,
  },
  confession: {
    type: {
      required: true,
      type: Number,
    },
    name: {
      ru: {
        required: true,
        type: String,
      },
      en: {
        required: true,
        type: String,
      }
    },
    short_name: {
      ru: {
        required: true,
        type: String,
      },
      en: {
        required: true,
        type: String,
      }
    }
  },
  schedule: Array,
  members_count: {
    required: true,
    type: Number,
    default: 1,
  },
  location: {
    country: {
      required: true,
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
    zip: {
      required: true,
      type: Number,
    },
    street: {
      required: true,
      type: String,
    },
  },
  avatar: String,
  cover: String,
}, { timestamps: true })

export const ChurchModel = model<ChurchModelDocumentInterface>('Church', ChurchSchema);
