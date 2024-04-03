import mongoose from "mongoose";
import { Product } from "../../../../models/Product";

export async function GET(req, res) {
    await mongoose.connect(process.env.MONGO_URL);

    const url = new URL(req.url);
    const ids = url.searchParams.get('ids');

    if (ids) {
        const idsArray = ids.split(',');
        const products = await Product.find({ '_id': { $in: idsArray } }).exec();
        return Response.json(products)
    }
    else {
        const products = await Product.find();
        return Response.json(products);
    }

}