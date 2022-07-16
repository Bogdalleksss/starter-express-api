import { model, Schema, Document } from 'mongoose';

export interface VerifyModelInterface {
  type: number,
  code: number,
}


export type VerifyModelDocumentInterface = VerifyModelInterface & Document;
/*
type - type verification
acceptable values:
  1 - email
  2 - phone
*/
const VerifySchema = new Schema<VerifyModelInterface>({
  type: {
    required: true,
    type: Number,
  },
  code: {
    required: true,
    type: Number,
  },
}, { timestamps: true })

export const VerifyModel = model<VerifyModelDocumentInterface>('Verify', VerifySchema);
