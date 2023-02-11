import React from "react";
import styles from "./Admin.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
// import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import { useSupplyChainContext } from "../../Context/SupplyChainContext";
// import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import axios from "axios";
// import { useAuth } from "../../Context/AuthContext";
// import { useSafeBuyContext } from "../../Context/SafeBuyContext";

const Admin = () => {
	const navigate = useNavigate();
	const { checkIfWalletConnected, currentAccount } = useAuth();

	const [requests, setRequests] = useState([]);
	const [srequests, setSRequests] = useState([]);
	const [owner, setIsOwner] = useState(false);

	const {
		fetchActiveCompanyRequests,
		acceptCompany,
		rejectCompany,
		isOwnerAddress,
		fetchActiveSellerRequests,
		rejectSeller,
		acceptSeller,
	} = useSupplyChainContext();

	const fetchAdmin = async () => {
		try {
			const data = await isOwnerAddress();
			console.log(data);
			if (currentAccount === "0x640da600e123cf9bc1aed3b87088db717078323b")
				setIsOwner(true);
			else navigate("/register");
			fetchRequests();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		console.log(currentAccount);
		checkIfWalletConnected();
		if (currentAccount !== "") {
			fetchAdmin();
		}
	}, [currentAccount]);

	const fetchRequests = useCallback(async () => {
		console.log("Hello Admin :)");
		try {
			const data = await fetchActiveCompanyRequests();
			const sdata = await fetchActiveSellerRequests();
			setRequests(data);
			setSRequests(sdata);
		} catch (err) {
			console.log(err);
		}
	});

	//

	const acceptComp = useCallback(async (e, comAdd) => {
		console.log("Hello verifier, accept me :)");
		e.preventDefault();
		try {
			await acceptCompany(comAdd);
			console.log("Company Accepted");
		} catch (err) {
			console.log(err);
		}
	});

	const rejectComp = useCallback(async (e, comAdd) => {
		console.log("Hello verifier, reject me :(");
		e.preventDefault();
		try {
			await rejectCompany(comAdd);
			console.log("Company Rejected");
		} catch (err) {
			console.log(err);
		}
	});

	const acceptSellerBtn = useCallback(async (e, comAdd) => {
		console.log("Hello verifier, accept me :)");
		e.preventDefault();
		try {
			await acceptSeller(comAdd);
			console.log("Company Accepted");
		} catch (err) {
			console.log(err);
		}
	});

	const rejectSellerBtn = useCallback(async (e, comAdd) => {
		console.log("Hello verifier, reject me :(");
		e.preventDefault();
		try {
			await rejectSeller(comAdd);
			console.log("Company Rejected");
		} catch (err) {
			console.log(err);
		}
	});

	return (
		<>
			<ToastContainer />
			<div className={styles.companyDashboardContainer}>
				<div className={styles.dashboardBox}>
					<div className={styles.detailsBox}>
						<div className={styles.detailsHeading}>
							<span>Company Requests</span>
						</div>
						{requests.length > 0 ? (
							<>
								<div className={styles.docCardHeader}>
									<span className={styles.docCardContent}>
										Company Name
									</span>
									<span className={styles.docCardContent}>
										Company Identification Number
									</span>
									<span className={styles.docCardContent}>
										Category
									</span>
									<span className={styles.docCardContent}>
										Verify
									</span>
								</div>
								{requests.map((item, index) => {
									return (
										<div
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
												{item.cin}
											</span>
											<span
												className={
													styles.docCardContent
												}
											>
												{item.category}
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
														acceptComp(
															e,
															item.comAdd
														);
													}}
												>
													accept
													{/* <DoneRoundedIcon /> */}
												</button>
												<button
													className={
														styles.viewAllBtn
													}
													onClick={(e) => {
														rejectComp(
															e,
															item.comAdd
														);
													}}
												>
													reject
													{/* <CloseRoundedIcon /> */}
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
			<div className={styles.companyDashboardContainer}>
				<div className={styles.dashboardBox}>
					<div className={styles.detailsBox}>
						<div className={styles.detailsHeading}>
							<span>Seller Requests</span>
						</div>
						{srequests.length > 0 ? (
							<>
								<div className={styles.docCardHeader}>
									<span className={styles.docCardContent}>
										Company Name
									</span>
									<span className={styles.docCardContent}>
										Company Identification Number
									</span>
									<span className={styles.docCardContent}>
										Category
									</span>
									<span className={styles.docCardContent}>
										Verify
									</span>
								</div>
								{srequests.map((item, index) => {
									return (
										<div
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
												{item.email}
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
														acceptSellerBtn(
															e,
															item.sellerAdd
														);
													}}
												>
													accept
													{/* <DoneRoundedIcon /> */}
												</button>
												<button
													className={
														styles.viewAllBtn
													}
													onClick={(e) => {
														rejectSellerBtn(
															e,
															item.sellerAdd
														);
													}}
												>
													reject
													{/* <CloseRoundedIcon /> */}
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
		</>
	);
};

export default Admin;
