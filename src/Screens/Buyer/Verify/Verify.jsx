import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";
import styles from "./Verify.module.css";
import template from "../../../images/template.jpg";
import ProductCanvas from "../../Manufacturer/Products/ProductCanvas";

const VerifyPage = () => {
	const { checkIfWalletConnected, currentAccount } = useAuth();
	const [product, setProduct] = useState([]);
	const [productItem, setProductItem] = useState([]);

	useEffect(() => {
		checkIfWalletConnected();
		fetchProductItem();
	}, [currentAccount]);

	const {
		fetchProductItemById,
		fetchProductById,
		fetchCompanyByAddress,
		fetchCompanyNFTAddress,
		checkState,
		fetchProductItemByPublicKey,
		scanAndGrow,
		uploadFilesToIPFS,
	} = useSupplyChainContext();

	const [purchased, setPurchased] = useState(false);

	const [nft, setNFT] = useState("");
	const fetchProductItem = useCallback(async () => {
		try {
			var companyAddress = window.location.pathname.split("/")[2];
			var pubKey = window.location.pathname.split("/")[3];

			const companyNFTAddress = await fetchCompanyNFTAddress(
				companyAddress
			);

			setNFT(companyNFTAddress);

			const id = await fetchProductItemByPublicKey(
				companyNFTAddress,
				pubKey
			);

			const data = await fetchProductItemById(companyNFTAddress, id);
			console.log(data);
			setProductItem(data);

			const product = await fetchProductById(
				companyNFTAddress,
				data.productID
			);

			const company = await fetchCompanyByAddress(companyAddress);

			setCompData(company);
			if (data.itemState === 7) setPurchased(true);

			var productItem = [
				{
					name: product.name,
					companyName: company.name,
					cin: company.cin,
					price: product.price,
					state: data.itemState,
					owner: data.owner,
					productId: product.productId,
				},
			];
			setProduct(productItem);
			console.log("data", productItem);
		} catch (err) {
			console.log(err);
		}
	});

	const [compData, setCompData] = useState([]);

	const draw = async (context, entry, height, width) => {
		console.log(entry);
		var img = document.getElementById("templateImage");
		context.drawImage(img, 0, 0, width, height);
		context.font = "28px Arial";
		context.fillStyle = "red";
		context.fillText(entry.compData.name, 300, 304);
		context.fillText(entry.productDetails.productId, 300, 256);
		context.fillText(entry.productDetails.name, 300, 207);
		context.fillText(
			entry.productDetails.price.toNumber().toString(),
			300,
			400
		);
		console.log(productItem);
		context.fillText(productItem.ownerID, 300, 447);
		context.fillText(currentAccount, 300, 493);
		context.fillText(productItem.itemState, 300, 643);
		context.fillText(entry.compData.cin, 300, 351);
	};
	const handleUpdate = async () => {
		var pubKey = window.location.pathname.split("/")[3];
		if (productItem.itemState === 3 || productItem.itemState === 5) {
			var canvases = document.getElementsByClassName("templateCanvas");
			var url = canvases[0].toDataURL("image/png");

			let file = dataURLtoFile(url, "warranty.png");
			const cid = await uploadFilesToIPFS([file]);
			console.log(cid);

			await scanAndGrow(nft, pubKey, cid, productItem.itemState + 1);
		} else {
			await scanAndGrow(
				nft,
				pubKey,
				productItem.cid,
				productItem.itemState + 1
			);
		}
	};

	function dataURLtoFile(dataurl, filename) {
		var arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	}

	return (
		<>
			{purchased === false ? (
				<div className={styles.verifyPageContainer}>
					<div className={styles.verifyContainer}>
						{product.map((item, index) => {
							return (
								<div
									className={styles.verifyContainer}
									key={index}
								>
									<span className={styles.verifyDetails}>
										Product Name:{" "}
										<span className={styles.detailsContent}>
											{item.productName}
										</span>
									</span>
									<span className={styles.verifyDetails}>
										Company:{" "}
										<span className={styles.detailsContent}>
											{item.companyName}
										</span>
									</span>
									<span className={styles.verifyDetails}>
										Company Identification Number:{" "}
										<span className={styles.detailsContent}>
											{item.cin}
										</span>
									</span>
									<span className={styles.verifyDetails}>
										Manufacture Date:{" "}
										<span className={styles.detailsContent}>
											{item.manDate}
										</span>
									</span>
									<span className={styles.verifyDetails}>
										Expiry Date:{" "}
										<span className={styles.detailsContent}>
											{item.exDate}
										</span>
									</span>

									<button
										className={styles.checkProductBtn}
										onClick={(e) => {
											e.preventDefault();
											if (
												productItem.itemState === 1 ||
												productItem.itemState === 2 ||
												productItem.itemState === 3 ||
												productItem.itemState === 4 ||
												productItem.itemState === 5
											) {
												handleUpdate();
											}
										}}
									>
										Update State
									</button>
								</div>
							);
						})}
						<div className="">
							<ProductCanvas
								entry={{
									compData: compData,
									productDetails: product[0],
								}}
								draw={draw}
								height={900}
								width={700}
							/>
						</div>
						<img
							id="templateImage"
							style={{ display: "none" }}
							height={900}
							width={700}
							src={template}
						/>
					</div>
				</div>
			) : (
				<div className={styles.productPurchasedMessage}>
					The Product is already purchased!
				</div>
			)}
		</>
	);
};

export default VerifyPage;
