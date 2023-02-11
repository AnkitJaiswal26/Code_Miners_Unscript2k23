import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [companyNFTAdd, setCompanyNFTAdd] = useState("");

	const [compData, setCompData] = useState();
	const { checkIfWalletConnected, currentAccount } = useAuth();

	useEffect(() => {
		checkIfWalletConnected();
	}, [currentAccount]);

	const {
		fetchCompanyByAddress,
		fetchCompanyNFTAddress,
		addBulkProducts,
		fetchProductItemsByProductId,
		uploadFilesToIPFS,
		fetchAllProducts,
		addProduct,
	} = useSupplyChainContext();

	const fetchUser = useCallback(async () => {
		try {
			const company = await fetchCompanyByAddress(currentAccount);
			setCompData(company);
			console.log("comp", company);

			const compNFTAdd = await fetchCompanyNFTAddress(company.comAdd);
			console.log(compNFTAdd);
			setCompanyNFTAdd(compNFTAdd);
		} catch (err) {
			// navigate("/registerCompany");
			console.log(err);
		}
	});

	useEffect(() => {
		if (currentAccount) fetchUser();
	}, [currentAccount]);

	const fetchProducts = useCallback(async () => {
		console.log("Hell");
		const result = await fetchAllProducts(companyNFTAdd);
		console.log(result);

		var res = [];
		for (let i = 0; i < result.length; i++) {
			const data = await fetchProductItemsByProductId(
				companyNFTAdd,
				result[i].productId
			);

			console.log(data);

			res.push({
				name: result[i].name,
				count: data.length,
				productId: result[i].productId,
				price: result[i].price,
			});
		}

		console.log(res);
		setProducts(res);
		console.log(res);
	});

	useEffect(() => {
		if (currentAccount) fetchUser();
		if (companyNFTAdd) fetchProducts();
	}, [currentAccount, companyNFTAdd]);

	const navigate = useNavigate();

	return (
		<div style={{ margin: "auto", justifyContent: "space-around" }}>
			<div className="">
				<div className="text-center text-2xl font-bold mt-4 mb-2">
					Previous Jobs
				</div>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						flexBasis: "1/3",
						justifyContent: "center",
					}}
				>
					{products.map((item, index) => {
						return (
							<div class="mx-10 my-5">
								<div class="max-w-sm rounded overflow-hidden shadow-lg">
									<img
										src="/logo192.png"
										alt="Logo"
										onClick={(e) => {
											navigate("/");
										}}
										style={{ margin: "auto" }}
									/>
									;
									<div class="px-6 py-4">
										<div class="font-bold text-xl mb-2">
											{item.name}
										</div>
										<p class="text-gray-700 text-base mb-2">
											{item.description}
										</p>
										<p class="font-bold text-lg mb-2">
											Price: {item.price.toNumber()}
										</p>
										<p class="font-bold text-lg mb-2">
											Items: {item.count}
										</p>
									</div>
									<div className="flex justify-center mt-2">
										<button
											type="button"
											onClick={(e) => {
												navigate(
													`/addItems/${companyNFTAdd}/${item.productId}`
												);
											}}
											className="mb-6 inline-block px-16 py-3 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
											style={{
												backgroundColor: "#22a6c7",
											}}
										>
											Add
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Products;
