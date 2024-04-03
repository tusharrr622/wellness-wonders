import mongoose, { model, models } from 'mongoose';
import { stringify } from 'postcss';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
}, { timestamps: true });


export const User = models?.User || model('User', userSchema);