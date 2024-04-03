"use client"
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useSession } from "next-auth/react";
import { ProductContext } from "./components/AppContext";
import Product from "./components/layout/Product";

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [products, setProducts] = useState();


  useEffect(() => {
    fetch('/api/products').then(res => {
      res.json().then(menuItems => {
        const shuffledArray = menuItems.sort(() => Math.random() - 0.5).slice(0, 3);
        setProducts(shuffledArray);
      });
    });
  }, []);

  return (
    <>
      <div className="mt-10 text-center">

        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white py-1.5 px-1.5 dark:bg-gray-900 md:text-5xl lg:text-4xl"> Our mission is to provide you with the tools and resources you need to live your best life, naturally.</h1>
      </div>
      <div className="mt-10 ml-4">


        <h2 className="text-4xl font-bold dark:text-gray-900">Discover Our Products</h2>

      

          <div className="grid sm:grid-cols-3 gap-4 overflow-x-scroll snap-x scrollbar-hide">
            {products?.length > 0 && products.map(item => (
              <Product key={item._id} {...item} />
            ))}
          </div>
      
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white py-1.5 px-1.5 dark:bg-gray-900 md:text-5xl lg:text-4xl">Shop with confidence knowing that you&apos;re getting the best for your health and wellness needs.</h1>
      </div>


    </>
  );
}
