import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";
import styles from './Products.module.css'

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
		console.log(res, "ppppppppppp");
	});

	useEffect(() => {
		if (currentAccount) fetchUser();
		if (companyNFTAdd) fetchProducts();
	}, [currentAccount, companyNFTAdd]);

	const navigate = useNavigate();

	return (
		<div style={{ margin: "auto", justifyContent: "space-around" }}>
			<div className="">
				<div className="text-center text-2xl font-bold mt-4 mb-6">
					Company Details
				</div>
				<div className="mx-28 border rounded">
					<div class="px-6 py-4 w-3/5">
						<div class="font-medium text-xl mb-4">
							Company Name: {compData ? compData[1] : ""}
						</div>
						<hr />
						<div class="font-medium text-xl mt-2 mb-4">
							Company cin: {compData ? compData[2] : ""}
						</div>
						<hr />
					</div>
				</div>
				<div className="text-center text-2xl font-bold mt-4 mb-6">
					Product Details
				</div>
				{products.length > 0 ? (
					<>
						<div style={{ width: "85%", marginTop: "40px", margin: "auto", justifyContent: "space-around" }} className={styles.docCardHeader}>
							<span className={styles.docCardContent}>
								Product Name
							</span>
							<span className={styles.docCardContent}>
								Price
							</span>
							<span className={styles.docCardContent}>
								Count
							</span>
							<span className={styles.docCardContent}>
								Add Product
							</span>
						</div>
						{products.map((item, index) => {
							return (
								<div
									style={{ width: "85%", margin: "auto", justifyContent: "space-around" }}
									className={
										index % 2 == 0
											? `${styles.docCard} ${styles.evenDocCard}`
											: `${styles.docCard} ${styles.oddDocCard}`
									}
									key={index}
								>
									<span
										className={
											styles.docCardContent
										}
									>
										{item.name}
									</span>
									<span
										className={
											styles.docCardContent
										}
									>
										{item.price.toNumber()}
									</span>
									<span
										className={
											styles.docCardContent
										}
									>
										{item.count}
									</span>
									<span
										className={
											styles.docCardContent
										}
									>
										<button
											className={
												styles.viewAllBtn
											}
											onClick={(e) => {
												navigate(
													`/addItems/${companyNFTAdd}/${item.productId}`
												);
											}}
										>
											Add
										</button>
									</span>
								</div>
							);
						})}
					</>
				) : (
					<span className={styles.emptyListMessage}>
						No response found
					</span>
				)}



				{/* <div
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
				</div> */}
			</div>
		</div>
	);
};

export default Products;
