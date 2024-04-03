"use client"
import { useEffect, useState } from "react"
import Product from "../components/layout/Product";

export default function CategoriesPage() {
    const [productsInfo, setProductsInfo] = useState([]);
    const [phrase, SetPhrase] = useState('');
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(json => setProductsInfo(json))
    }, [])
    const categoriesNames = [...new Set(productsInfo.map(p => p.Category))];

    let products;
    if (phrase) {
        products = productsInfo.filter(p => p.name.toLowerCase().includes(phrase))
    } else {
        products = productsInfo;
    }

    return (
        <div className="my-8">

            <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                type="search" name="Search" placeholder="Search for products..." value={phrase} onChange={ev => SetPhrase(ev.target.value)} />

            {categoriesNames.map(CategoryName => (
                <div key={CategoryName}>
                    {products.find(p => p.Category === CategoryName) && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 text-center mt-8">{CategoryName}</h2>
                            <div className="flex sm:grid-cols-3 gap-4 overflow-x-scroll snap-x scrollbar-hide">
                                {products.filter(p => p.Category === CategoryName).map(productInfo => (
                                    <Product {...productInfo} key={productInfo._id} />
                                ))}
                            </div>

                        </>
                    )}
                </div>
            ))}
        </div>

    )
}
