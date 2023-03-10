import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav class="flex items-center justify-between flex-wrap bg-purple-500 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                <span class="font-semibold text-xl tracking-tight"> DecentraSupply</span>
            </div>
            <div class="w-full block flex lg:flex lg:items-center lg:w-auto">
                <div class="text-base lg:flex-grow ">
                    <a href="/" class="mr-6 block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4">
                        Home
                    </a>
                    <a href="/about" class="ml-6 mr-6 block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4">
                        About
                    </a>
                   
                    <a href="/registerCompany" class="ml-6 mr-6  block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4">
                        Manufacturer
                    </a>
                    <a href="/registerSeller" class="ml-6 mr-6  block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4">
                        Seller
                    </a>
                    <a href="/register" class="ml-6 mr-6  block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white">
                        Buyer
                    </a>
                </div>

            </div>
        </nav></div>
    )
}

export default Navbar