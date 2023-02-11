import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";
import { useNavigate } from "react-router-dom";

const BRegister = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState(true);
	const [mobileNo, setMobileNo] = useState("");
	const [age, setAge] = useState(0);

	const [pubAddr, setPubAddr] = useState("");
	const [sid, setSid] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const { checkIfWalletConnected, currentAccount } = useAuth();

	useEffect(() => {
		checkIfWalletConnected();
		if (currentAccount) fetchUser();
	}, [currentAccount]);

	const navigate = useNavigate();

	const { registerUser, fetchUserByAddress } = useSupplyChainContext();
	const fetchUser = useCallback(async () => {
		try {
			const user = await fetchUserByAddress(currentAccount);
			console.log(user);
			if (user.name !== "") {
				navigate("/userDashboard");
			}
		} catch (err) {
			console.log("User cannot be fetched");
		}
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (name == "" || email == "" || mobileNo == "" || age == 0) {
				return;
			} else {
				setIsLoading(true);
				console.log(currentAccount, name, email, mobileNo, gender, age);
				await registerUser(
					currentAccount,
					name,
					email,
					mobileNo,
					true,
					age
				);
			}
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
		setIsLoading(false);
	};

	return (
		<div>
			<div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
				<div className="text-center text-2xl font-bold">
					Register as a Buyer
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
									Name
								</label>
								<div className="mt-1 w-full">
									<input
										id="firstname"
										type="text"
										placeholder="Your Name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
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
									Your Email address
								</label>
								<div className="mt-1">
									<input
										type="text"
										placeholder="Email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
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

							<div className="w-full">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Age
								</label>
								<div className="mt-1 w-full">
									<input
										id="firstname"
										type="number"
										placeholder="Your age"
										value={age}
										onChange={(e) =>
											setAge(e.target.value.trim())
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							{/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "45%" }}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    dob
                  </label>
                  <div className="mt-1">
                    <input
                      id="dob"
                      type="date"
                      placeholder="DOB"
                      value={dob}
                      onChange={(e) => setDOB(e.target.value.trim())}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div style={{ width: "45%" }}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <div className="mt-1">
                    <select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value.trim());
                      }}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div> */}

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

export default BRegister;
