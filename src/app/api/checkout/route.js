import mongoose from "mongoose";

import Order from "../../../../models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Product } from "../../../../models/Product";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
    mongoose.connect(process.env.MONGO_URL);

    const {
        selectedproducts,
        address,
        city,
        name,

    } = await req.json();

    const usersession = await getServerSession(authOptions);
    const userEmail = usersession?.user?.email;

    console.log(selectedproducts);
    const productIds = selectedproducts;
    const uniqIds = [...new Set(productIds)];
    const products = await Product.find({ _id: { $in: uniqIds } }).exec();



    let stripeline_items = [];
    let quantity;
    let product;
    for (let productId of uniqIds) {
        quantity = productIds.filter(id => id === productId).length;
        product = products.find(p => p._id.toString() === productId);
        stripeline_items.push({
            quantity,
            price_data: {
                currency: 'USD',
                product_data: { name: product.name },
                unit_amount: product.Price * 100,
            },
        })
    }

    console.log(stripeline_items);
    const orderDoc = await Order.create({
        products: products,
        name,
        userEmail,
        address,
        city,
        paid: false,
    })

    const session = await stripe.checkout.sessions.create({
        line_items: stripeline_items,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
        cancel_url: process.env.NEXTAUTH_URL + '/?canceled=true',
        metadata: { orderId: orderDoc._id.toString() },
        payment_intent_data: {
            metadata: { orderId: orderDoc._id.toString() },
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: { amount: 500, currency: 'USD' },
                },
            }
        ],
    });

    return Response.json(session.url);
}