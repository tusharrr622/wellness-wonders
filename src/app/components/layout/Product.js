import { useContext } from "react"
import { ProductContext } from "../AppContext"
import Image from "next/image";

export default function Product({ _id, name, Picture, Description, Price }) {
    const { setSelectedProducts } = useContext(ProductContext);

    function addProduct() {
        setSelectedProducts(prev => [...prev, _id])
    }
    return (
        <div className="ml-10 px-5 snap-start flex-shrink-0 my-7">
            <div className="w-72">
                <div className="bg-blue-100 p-5 rounded-xl">
                    <Image src={Picture} alt={name} />
                </div>
                <div className="mt-1">
                    <h3 className="font-bold text-lg">{name}</h3>
                </div>
                <p className="text-sm mt-1 leading-4">{Description}</p>
                <div className="flex mt-1 justify-between items-center">
                    <div className="text-2xl font-bold">${Price}</div>
                    <button onClick={addProduct} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-1 px-3">+</button>
                </div>
            </div>
        </div>
    )
}
