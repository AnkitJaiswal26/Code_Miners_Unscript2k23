import React, { useState } from 'react'

const AddProduct = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [fileName, setFileName] = useState("");
	const [researchFile, setResearchFile] = useState(null);

    const handlePosterFileChange = (e) => {
		setFileName(e.target.files[0].name);
		setResearchFile(e.target.files);
	};

    return (
        <div
        >
            <div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
                <div className="text-center text-2xl font-bold">
                    Add a Product
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-lg">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6 w-full"
                        // onSubmit={handleSubmit}
                        >
                            <div className="w-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Product Name
                                </label>
                                <div className="mt-1 w-full">
                                    <input
                                        id="productname"
                                        type="text"
                                        placeholder="Product"
                                        value={firstName}
                                        onChange={(e) => setfirstName(e.target.value.trim())}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Product Description
                                </label>
                                <div className="mt-1 w-full">
                                    <input
                                        id="productdesc"
                                        type="text"
                                        placeholder="Description"
                                        value={firstName}
                                        onChange={(e) => setfirstName(e.target.value.trim())}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Product Category
                                </label>
                                <div className="mt-1 w-full">
                                    <input
                                        id="productcategory"
                                        type="text"
                                        placeholder="Your Name"
                                        value={firstName}
                                        onChange={(e) => setfirstName(e.target.value.trim())}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Product Price
                                </label>
                                <div className="mt-1 w-full">
                                    <input
                                        id="productprice"
                                        type="number"
                                        placeholder="Price"
                                        value={firstName}
                                        // onChange={(e) => setfirstName(e.target.value.trim())}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="formFile"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Upload Image
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="file"
                                        id="formFile"
                                        accept="image/*"
                                        onChange={handlePosterFileChange}
                                        className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct