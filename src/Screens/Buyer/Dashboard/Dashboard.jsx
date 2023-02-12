import React from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";

const UserDashboard = () => {
	const navigate = useNavigate();

	const { checkIfWalletConnected, currentAccount } = useAuth();
	const [user, setUser] = useState([]);

	useEffect(() => {
		checkIfWalletConnected();
		if (currentAccount) {
			fetchUser();
			fetchUserProductItems();
		}
	}, [currentAccount]);

	const {
		fetchUserByAddress,
		fetchUserItems,
		fetchAllCompaniesNFT,
		fetchProductById,
		fetchAllUserProducts,
		fetchAllProducts,
		fetchProductItemsByProductId,
	} = useSupplyChainContext();
	const fetchUser = useCallback(async () => {
		try {
			const data = await fetchUserByAddress(currentAccount);
			console.log(data);
			setUser(data);
		} catch (err) {
			navigate("/register");
		}
	});

	const fetchUserProductItems = async () => {
		try {
			const companies = await fetchAllCompaniesNFT();
			console.log(companies);
			var result = [];
			for (let i = 0; i < companies.length; i++) {
				const temp = await fetchAllProducts(companies[i]);

				console.log(temp);
				for (let j = 0; j < temp.length; j++) {
					const data = await fetchProductItemsByProductId(
						companies[i],
						temp[j].productId
					);
					console.log(data);
					for (let k = 0; k < data.length; k++) {
						if (
							data[k].ownerID ===
							"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
						) {
							result.push(data[k]);
						}
					}
				}
			}
			setProducts(result);
			console.log(companies);
		} catch (err) {
			console.log(err);
		}
	};

	const [products, setProducts] = useState([]);

	return (
		<>
			<ToastContainer />
			<div className={styles.companyDashboardContainer}>
				<div className={styles.dashboardBox}>
					<div className={styles.heading}>
						Welcome{" "}
						<span className={styles.accountName}>{user.name}</span>
					</div>

					<div className={styles.detailsBox}>
						<span className={styles.detailsHeading}>
							My Profile
						</span>
						<div className={styles.detailsBoxContent}>
							<span className={styles.key}>Public Address: </span>
							<span className={styles.name}>{user.userAdd}</span>
							<span className={styles.key}>Name: </span>
							<span className={styles.name}>{user.name}</span>
							<span className={styles.key}>Email ID: </span>
							<span className={styles.name}>{user.email}</span>
						</div>
					</div>

					<div className={styles.detailsBox}>
						<div className={styles.detailsHeading}>
							<span>Purchased Products</span>
						</div>
						{products.length > 0 ? (
							<>
								<div className={styles.docCardHeader}>
									<span className={styles.docCardContent}>
										Product Id
									</span>
									<span className={styles.docCardContent}>
										Company Add
									</span>
									<span className={styles.docCardContent}>
										NFT
									</span>
								</div>
								{products.map((item, index) => {
									return (
										<div
											className={
												index % 2 == 0
													? `${styles.docCard} ${styles.evenDocCard}`
													: `${styles.docCard} ${styles.oddDocCard}`
											}
											onClick={() => {
												//   openDocPage(item.file.cid, item.file.fileName);
											}}
										>
											<span
												className={
													styles.docCardContent
												}
											>
												{item.upc.toNumber()}
											</span>
											<span
												className={
													styles.docCardContent
												}
											>
												{item.companyAdd}
											</span>
											<span
												className={
													styles.docCardContent
												}
											>
												<a
													target="_blank"
													href={`https://${item.cid}.ipfs.w3s.link/warranty.png`}
												>
													Open
												</a>
											</span>
										</div>
									);
								})}
							</>
						) : (
							<span className={styles.emptyListMessage}>
								No products found
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserDashboard;
