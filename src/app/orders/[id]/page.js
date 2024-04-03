"use client"
import { ProductContext } from "@/app/components/AppContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
    const [order, setOrder] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(true);
    const { id } = useParams();
    const { setSelectedProducts } = useContext(ProductContext);
    useEffect(() => {


        if (id) {
            setLoadingOrder(true);
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                    setLoadingOrder(false);
                });
            })

        }

        if (window.location.href.includes('?clear-cart=1')) {
            setSelectedProducts([]);
        }
    }, [id, setSelectedProducts]);


    console.log(order);
    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <div className="mt-4 mb-8">
                    {order && <p>Thanks for your order, {order.name}!</p>}

                    <p>We will call you when your order will be on the way.</p>
                </div>
            </div>
            <div className="border-t border-gray-200">
                <h2 className="text-lg font-medium mt-8">Order Details</h2>
                <ul className="divide-y divide-gray-200">
                    {order && order.products.map(product => (
                        <li key={product._id} className="py-2 flex items-center">
                            <Image src={product.Picture} alt={product.name} className="w-12 h-12 mr-4" />
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm">{product.Description}</p>
                                <p className="text-sm">Price: ${product.Price}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
