import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    token: { type: String },
    links: [{type: Types.ObjectId, ref: 'Link' }]
})

export default model('User', userSchema)
