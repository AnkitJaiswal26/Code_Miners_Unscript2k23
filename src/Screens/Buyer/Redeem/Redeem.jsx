import React from "react";
import styles from "./Redeem.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import ProductCanvas from "../../Manufacturer/Products/ProductCanvas";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";
import { useAuth } from "../../../Context/AuthContext";
// import ProductCanvas from "../ProductPage/ProductCanvas";
import template from "../../../images/template.jpg";

const Redeem = () => {
	const { checkIfWalletConnected, currentAccount } = useAuth();
	const [product, setProduct] = useState([]);
	const [productItem, setProductItem] = useState([]);
	useEffect(() => {
		checkIfWalletConnected();
		fetchProductItem();
	}, []);

	useEffect(() => {
		if (currentAccount !== "") {
			fetchUser();
		}
	}, [currentAccount]);

	const [user, setUser] = useState([]);

	const fetchUser = useCallback(async () => {
		try {
			const user = await fetchUserByAddress(currentAccount);
			setUser(user);
			console.log(user);
		} catch (err) {
			// console.log(err);
		}
	});

	const {
		buyProduct,
		fetchProductItemById,
		fetchProductById,
		fetchCompanyByAddress,
		fetchCompanyNFTAddress,
		checkState,
		fetchUserByAddress,
		fetchProductItemByPrivateKey,
		uploadFilesToIPFS,
	} = useSupplyChainContext();

	const fetchProductItem = useCallback(async () => {
		try {
			var companyAddress = window.location.pathname.split("/")[2];
			var privateKey = window.location.pathname.split("/")[3];

			console.log(typeof privateKey);

			const companyNFTAddress = await fetchCompanyNFTAddress(
				companyAddress
			);
			console.log(companyAddress, "aa", companyNFTAddress);

			const id = await fetchProductItemByPrivateKey(
				companyNFTAddress,
				privateKey
			);
			console.log("ProductItem ID", id);

			const data = await fetchProductItemById(companyNFTAddress, id);
			console.log("Product ID", data.productID);

			setProductItem(data);

			const product = await fetchProductById(
				companyNFTAddress,
				data.productID.toNumber()
			);
			console.log("product", product);
			if (data.itemState === 7) setPurchased(true);

			const company = await fetchCompanyByAddress(companyAddress);
			console.log("company", company);
			setCompData(company);

			var productItem = {
				name: product.name,
				companyName: company.name,
				cin: company.cin,
				price: product.price,
				state: data.itemState,
				owner: data.owner,
				productId: product.productId,
			};
			setProduct(productItem);
			console.log("data", productItem);
		} catch (err) {
			console.log(err);
		}
	});

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

	const checkProduct = useCallback(async () => {
		try {
			var companyAddress = window.location.pathname.split("/")[2];
			var privateKey = window.location.pathname.split("/")[3];

			const companyNFTAddress = await fetchCompanyNFTAddress(
				companyAddress
			);

			var canvases = document.getElementsByClassName("templateCanvas");
			console.log(canvases[0]);
			var url = canvases[0].toDataURL("image/png");

			let file = dataURLtoFile(url, "warranty.png");
			const cid = await uploadFilesToIPFS([file]);
			console.log(cid);
			await buyProduct(companyNFTAddress, privateKey, cid);
			console.log("Product purchased and Private Key verified");
		} catch (err) {
			console.log(err);
		}
	});

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
		context.fillText(currentAccount, 300, 447);
		context.fillText(productItem.distributorAdd, 300, 493);
		context.fillText(productItem.retailerAdd, 300, 546);
		context.fillText(currentAccount, 300, 593);
		context.fillText(productItem.itemState, 300, 643);
		context.fillText(entry.compData.cin, 300, 351);
	};
	const [purchased, setPurchased] = useState(false);

	const [nft, setNFT] = useState("");

	const [compData, setCompData] = useState([]);

	return (
		<>
			{purchased === false ? (
				<div className={styles.verifyPageContainer}>
					{product.name ? (
						<div className={styles.verifyContainer}>
							<span className={styles.verifyDetails}>
								Product Name:{" "}
								<span className={styles.detailsContent}>
									{product.name}
								</span>
							</span>
							<span className={styles.verifyDetails}>
								Company:{" "}
								<span className={styles.detailsContent}>
									{product.companyName}
								</span>
							</span>
							<span className={styles.verifyDetails}>
								Company Identification Number:{" "}
								<span className={styles.detailsContent}>
									{product.cin}
								</span>
							</span>
							<span className={styles.verifyDetails}>
								Manufacture Date:{" "}
								<span className={styles.detailsContent}>
									{product.manDate}
								</span>
							</span>
							<span className={styles.verifyDetails}>
								Expiry Date:{" "}
								<span className={styles.detailsContent}>
									{product.exDate}
								</span>
							</span>
							<button
								onClick={checkProduct}
								className={styles.checkProductBtn}
							>
								Redeem Product
							</button>
							<div className={styles.canvasContainer}>
								<ProductCanvas
									entry={{
										compData: compData,
										productDetails: product,
									}}
									draw={draw}
									height={900}
									width={700}
								/>
							</div>

							<img
								id="templateImage"
								className={styles.templateImage}
								height={900}
								width={700}
								crossorigin="anonymous"
								src={template}
							/>
						</div>
					) : (
						<></>
					)}
				</div>
			) : (
				<div className={styles.productPurchasedMessage}>
					The Product is already purchased!
				</div>
			)}
		</>
	);
};

export default Redeem;
