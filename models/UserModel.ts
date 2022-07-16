import { model, Schema, Document, Types } from 'mongoose';

export interface UserModelInterface {
  _id?: string;
  phone: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  sex: {
    type: number; // 0, 1
    slug: string; // male, female
  };
  role?: {
    type: number; // 0, 1, 2
    slug: string; // user, pastor, member
  };
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
  date_birth: Date;
  location?: {
    country?: string;
    city?: string;
    zip?: string;
    street?: string;
  };
  confirmed_at?: Date;
  social?: Types.Array<object>;
  web_site?: string;
  avatar?: string;
  confirmed?: boolean;
  church?: Types.ObjectId;
  friends?: Types.ObjectId[];
}

export type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema<UserModelInterface>({
  phone: {
    unique: true,
    required: true,
    type: String,
  },
  email: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
  username: {
    unique: true,
    required: true,
    type: String,
  },
  sex: {
    type: {
      required: true,
      type: Number,
    },
    slug: {
      required: true,
      type: String,
    },
  },
  role: {
    type: {
      required: true,
      type: Number,
      default: 0,
    },
    slug: {
      required: true,
      type: String,
      default: 'user'
    },
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
  date_birth: {
    required: true,
    type: Date,
  },
  location: {
    country: String,
    city: String,
    zip: Number,
    street: String,
  },
  church: {
    type: Types.ObjectId,
    ref: 'Church',
    default: undefined,
  },
  confirmed_at: Date,
  social: Array,
  web_site: String,
  avatar: String,
  confirmed: Boolean,
  friends: [{
    type: Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

UserSchema.set('toJSON', {
  transform: (_, obj) => {
    delete obj.password;
    return obj;
  }
})

export const UserModel = model<UserModelDocumentInterface>('User', UserSchema);

