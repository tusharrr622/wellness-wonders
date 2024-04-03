import mongoose, { model, models } from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String },
    Description: { type: String },
    Benefits: { type: String },
    Price: { type: Number },
    Picture:{ type: String },
    Category: { type: String },
}, { timestamps: true });


export const Product = models?.Product || model('Product', ProductSchema);