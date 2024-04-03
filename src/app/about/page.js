

export default function AboutPage() {
    return (


        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Welcome to Wellness Wonders, your trusted partner in health and wellness. Our journey began with a simple belief – that everyone deserves access to high-quality, natural products that support their well-being.</p>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Mission</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Our mission is to empower you to take control of your health and wellness naturally. We believe in the power of nature to heal, nourish, and rejuvenate the body and mind. That&aposs why we source only the finest ingredients for our products, ensuring that you get the best that nature has to offer.</p>
                </div>
            </div>
            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Products</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">At Wellness Wonders, we offer a wide range of products designed to support your health and wellness goals. From supplements to skincare, fitness equipment to healthy snacks, we&apos;ve got everything you need to live your best life.</p>
                </div>
            </div>
        </div>
    )
}
