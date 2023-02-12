import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { writeXLSX } from "xlsx";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { v4 as uuidv4 } from "uuid";
import * as xlsx from "xlsx";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";
import ProductCanvas from "../../Manufacturer/Products/ProductCanvas";
import template from "../../../images/template.png";
import styles from "./ProductList.module.css";

const UserProductList = () => {
	const [products, setProducts] = useState([]);
	const [userData, setUserData] = useState();
	const { checkIfWalletConnected, currentAccount } = useAuth();

	useEffect(() => {
		checkIfWalletConnected();
	}, [currentAccount]);

	const {
		fetchProductItemsByProductId,
		fetchAllProducts,
		fetchAllCompaniesNFT,
		fetchCompanyDetails,
		fetchUserByAddress,
	} = useSupplyChainContext();

	const fetchUser = useCallback(async () => {
		try {
			const seller = await fetchUserByAddress(currentAccount);
			setUserData(seller);
		} catch (err) {
			console.log(err);
		}
	});

	useEffect(() => {
		if (currentAccount) fetchUser();
	}, [currentAccount]);

	const fetchProducts = useCallback(async () => {
		const nfts = await fetchAllCompaniesNFT();
		var res = [];

		for (let i = 0; i < nfts.length; i++) {
			const result = await fetchAllProducts(nfts[i]);
			console.log(result);
			if (result)
				for (let j = 0; j < result.length; j++) {
					const data = await fetchProductItemsByProductId(
						nfts[i],
						result[j].productId
					);

					console.log(data);

					var count = 0;
					for (let k = 0; k < data.length; k++) {
						if (data[k].itemState === 4) {
							count += 1;
						}
					}

					console.log(count);

					const compData = await fetchCompanyDetails(nfts[i]);

					res.push({
						nft: nfts[i],
						name: result[j].name,
						comp: compData,
						count: count,
						productId: result[j].productId,
						price: result[j].price,
						description: result[j].description,
					});

					console.log("---------------------");
					console.log(nfts[i]);
					console.log("---------------------");
				}
		}
		setProducts(res);
		console.log(res);
	});

	useEffect(() => {
		if (currentAccount) {
			fetchUser();
		}
		if (products.length === 0) fetchProducts();
	}, [currentAccount]);

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
					{products.length > 0 ? (
						<>
							<div
								style={{
									width: "85%",
									marginTop: "40px",
									margin: "auto",
									justifyContent: "space-around",
								}}
								className={styles.docCardHeader}
							>
								<span className={styles.docCardContent}>
									Product Name
								</span>
								<span className={styles.docCardContent}>
									Product Description
								</span>
								<span className={styles.docCardContent}>
									Price
								</span>
								<span className={styles.docCardContent}>
									Count
								</span>
								<span className={styles.docCardContent}>
									Company
								</span>
								<span className={styles.docCardContent}>
									Buy
								</span>
							</div>
							{products.map((item, index) => {
								return (
									<div
										style={{
											width: "85%",
											margin: "auto",
											justifyContent: "space-around",
										}}
										className={
											index % 2 == 0
												? `${styles.docCard} ${styles.evenDocCard}`
												: `${styles.docCard} ${styles.oddDocCard}`
										}
										key={index}
									>
										<span className={styles.docCardContent}>
											{item.name}
										</span>
										<span className={styles.docCardContent}>
											{item.description}
										</span>
										<span className={styles.docCardContent}>
											{item.price.toNumber()}
										</span>
										<span className={styles.docCardContent}>
											{item.count}
										</span>
										<span className={styles.docCardContent}>
											{item.comp[1]}
										</span>
										<span className={styles.docCardContent}>
											<button
												className={styles.viewAllBtn}
												onClick={(e) => {
													// console.log(item);
													navigate(
														`/user/${item.nft}/${item.productId}`
													);
												}}
											>
												Buy
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
				</div>
			</div>
		</div>
	);
};

export default UserProductList;
