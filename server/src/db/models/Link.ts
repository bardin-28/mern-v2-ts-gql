import { Schema, model, Types } from 'mongoose';

const linkSchema = new Schema({
  original: { type: String, required: true },
  short: { type: String, required: true},
  code: { type: String, unique: true},
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'User'}
})

export default model('Link', linkSchema)
