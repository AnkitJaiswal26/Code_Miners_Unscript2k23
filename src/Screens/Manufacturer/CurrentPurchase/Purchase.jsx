import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";
import "./Purchase.css";

const Purchase = () => {
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
				itemNo: data.upc,
				owner: data.ownerID,
				state: data.itemState,
				productId: result[i].productId,
				price: result[i].price,
			});
		}

		setProducts(res);
	});

	useEffect(() => {
		if (currentAccount) fetchUser();
		if (companyNFTAdd) fetchProducts();
	}, [currentAccount, companyNFTAdd]);

	const navigate = useNavigate();

	return (
		<div>
			<div className="m-10">
				<div className="flex ">
					<img
						src="/logo192.png"
						alt="Logo"
						style={{ margin: "auto" }}
					/>
					;
					<div class="px-6 py-4">
						<div class="font-bold text-xl mb-2">
							boAt Rockerz 255 Pro
						</div>
						<p class="text-gray-700 text-base mb-2">
							Wireless Neckband with 10mm Drivers, Upto 8Hrs
							Uninterrupted Music, Made in India, Ergonomic and
							comfortable.
						</p>
						<p class="font-bold text-lg mb-2">Price: 1000</p>
					</div>
				</div>
			</div>
			<div className="my-10 rounded mx-auto">
				<p className="px-32 py-5 text-lg font-bold">Purchase History</p>
				<table id="customers" className="text-center rounded m-auto">
					<tr>
						<th>Item No</th>
						<th>Purchase By</th>
						<th>Status</th>
					</tr>
					{products.map((item, index) => {
						return (
							<tr>
								<td>{item.itemNo}</td>
								<td>{item.owner}</td>
								<td>{item.state}</td>
							</tr>
						);
					})}
				</table>
			</div>
		</div>
	);
};

export default Purchase;
