import React from 'react'


const ProductCard = () => {
    return (
        <div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img src="/logo192.png" alt="Logo" style={{ margin: "auto" }} />;
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">boAt Rockerz 255 Pro</div>
                    <p class="text-gray-700 text-base mb-2">
                    Wireless Neckband with 10mm Drivers, Upto 8Hrs Uninterrupted Music, Made in India, Ergonomic and comfortable.
                    </p>
                    <p class="font-bold text-lg mb-2">
                     Price: 1000
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#hearables</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#audio</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard