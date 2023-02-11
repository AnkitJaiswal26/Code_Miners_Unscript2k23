import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";

const SRegister = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");

	const [sellerName, setSellerName] = useState("");
	const [mobileNo, setMobileNo] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const { checkIfWalletConnected, currentAccount } = useAuth();

	useEffect(() => {
		checkIfWalletConnected();
		if (currentAccount) fetchUser();
	}, [currentAccount]);

	const { registerSeller, fetchSellerByAddress } = useSupplyChainContext();

	const fetchUser = useCallback(async () => {
		try {
			const company = await fetchSellerByAddress(currentAccount);
			if (company.cin !== "") {
				navigate("/companyDashboard");
			}
		} catch (err) {}
	});

	const handleSubmit = async (e) => {
		console.log("Register");
		console.log("Hello");
		e.preventDefault();
		try {
			if (sellerName === "") {
				return;
			} else {
				setIsLoading(true);
				console.log(currentAccount, sellerName, mobileNo, email);
				await registerSeller(
					currentAccount,
					sellerName,
					mobileNo,
					email
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
				<div className="text-center text-2xl font-bold">
					Register as a Seller
				</div>
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-lg">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form
							className="space-y-6 w-full"
							// onSubmit={handleSubmit}
						>
							<div className="w-full">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Seller Name
								</label>
								<div className="mt-1 w-full">
									<input
										id="firstname"
										type="text"
										placeholder="Your Name"
										value={sellerName}
										onChange={(e) =>
											setSellerName(e.target.value.trim())
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<div className="mt-1">
									<input
										type="text"
										placeholder="Email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value.trim())
										}
										id="email"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="mobile"
									className="block text-sm font-medium text-gray-700"
								>
									Mobile Number
								</label>
								<div className="mt-1">
									<input
										id="mobile"
										type="text"
										placeholder="Mobile No"
										value={mobileNo}
										onChange={(e) =>
											setMobileNo(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<button
									type="submit"
									onClick={handleSubmit}
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
	);
};

export default SRegister;
