import React,{useState} from 'react';
import ProductCard from '../../../Components/ProductCard/ProductCard';

const ProductList = () => {
    const [buyCount, setBuyCount] = useState(0);

    return (
        <div style={{margin: "auto", justifyContent: "space-around"}}>
            <div className="">
                <div className="text-center text-2xl font-bold mt-4 mb-2">Previous Jobs</div>
                <div style={{display:"flex",flexWrap: "wrap",flexBasis:"1/3",justifyContent:"center" }}>
                <div class="mx-10 my-5">
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
                <div class="px-6 pt-4 pb-2 ">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#hearables</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#audio</span>
                </div>

                <div className='flex mt-2 justify-around '>
                    <div className='text-xl font-medium'>
                        <button className='px-2 py-2'>-</button>
                        {buyCount}
                        <button className='px-2 py-2'>+</button>
                    </div>

                    <button type="button" className="mb-6 inline-block px-16 py-3 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                        style={{ backgroundColor: "#22a6c7" }}
                    //  onClick={(e) => {
                    //     e.preventDefault();
                    //    }}
                    >Buy</button>

                </div>

            </div>
        </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList