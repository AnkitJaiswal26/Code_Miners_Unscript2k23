import React from 'react'
import './Purchase.css'

const Purchase = () => {
    return (
        <div>
            <div className='m-10'>
                <div className='flex '>
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

                </div>
            </div>
            <div className='my-10 rounded mx-auto'>
                <p className='px-32 py-5 text-lg font-bold'>Purchase History</p>
                <table id="customers" className='text-center rounded m-auto'>
                    <tr>
                        <th>Item No</th>
                        <th>Purchase By</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>34081409</td>
                        <td>Maria Anders</td>
                        <td>Shipped</td>
                    </tr>
                    <tr>
                        <td>86590839</td>
                        <td>Christina Berglund</td>
                        <td>Delivered</td>
                    </tr>
                    <tr>
                        <td>95730393</td>
                        <td>Francisco Chang</td>
                        <td>Out for Delivery</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Purchase