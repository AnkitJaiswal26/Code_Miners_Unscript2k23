import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";
import { v4 as uuidv4 } from "uuid";
import * as xlsx from "xlsx";
import template from "../../../images/template.jpg";
import ProductCanvas from "../../Manufacturer/Products/ProductCanvas";

const AddProductItemForUser = () => {
	const [productDetails, setProductDetails] = useState({});
	const [companyNFTAdd, setCompanyNFTAdd] = useState("");

	const [compData, setCompData] = useState();
	const [quantity, setQuantity] = useState(0);
	const { checkIfWalletConnected, currentAccount } = useAuth();

	useEffect(() => {
		checkIfWalletConnected();
	}, [currentAccount]);

	const {
		fetchProductItemsByProductId,
		uploadFilesToIPFS,
		buyProductForUser,
		fetchProductById,
		fetchCompanyDetails,
		fetchUserByAddress,
	} = useSupplyChainContext();

	const [user, setUser] = useState();

	const fetchUser = useCallback(async () => {
		try {
			const userData = await fetchUserByAddress(currentAccount);
			setUser(userData);
		} catch (err) {
			navigate("/register");
			console.log(err);
		}
	});

	const [productItems, setProductItems] = useState([]);

	useEffect(() => {
		if (currentAccount) fetchUser();
	}, [currentAccount]);

	// const [productDetails, setProductDetails] = useState([]);

	const fetchProducts = useCallback(async () => {
		const nft = window.location.pathname.split("/")[2];
		const compDet = await fetchCompanyDetails(nft);
		setCompData(compDet);
		const productId = window.location.pathname.split("/")[3];

		const data = await fetchProductItemsByProductId(
			nft,
			parseInt(productId)
		);

		console.log(data);
		const det = await fetchProductById(nft, parseInt(productId));

		setProductDetails(det);

		var res = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].itemState === 4) {
				res.push(data[i]);
			}
		}

		setProductItems(res);
		console.log(data);
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
		context.fillText(currentAccount, 300, 447);
		context.fillText(entry.compData.cin, 300, 351);
	};

	const buyProductItem = async (e) => {
		e.preventDefault();
		try {
			const nft = window.location.pathname.split("/")[2];

			var canvases = document.getElementsByClassName("templateCanvas");
			console.log(canvases);

			var url = canvases[0].toDataURL("image/png");

			let file = dataURLtoFile(url, "warranty.png");
			const cid = await uploadFilesToIPFS([file]);

			console.log(nft, productItems[0].upc, cid);
			await buyProductForUser(nft, productItems[0].upc, cid);
		} catch (err) {
			console.log(err);
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

	useEffect(() => {
		if (currentAccount) {
			fetchUser();
			fetchProducts();
		}
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

							<div class="px-6 py-4">
								<div class="font-bold text-xl mb-2">
									{productDetails.name}
								</div>
								<p class="text-gray-700 text-base mb-2">
									{productDetails.description}
								</p>
								<p class="font-bold text-lg mb-2">
									Price:{" "}
									{productDetails.price
										? productDetails.price.toNumber()
										: ""}
								</p>
								<p class="font-bold text-lg mb-2">
									Items: {productItems.length}
								</p>
							</div>
							<div
								style={{ width: "230px" }}
								className="flex  ml-6 justify-between"
							>
								<button
									type="button"
									className="mb-6 inline-block px-10 py-3 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
									style={{
										backgroundColor: "#22a6c7",
									}}
									onClick={buyProductItem}
								>
									Buy
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="">
					{Array(parseInt(1))
						.fill(0)
						.map((_, index) => {
							return (
								<ProductCanvas
									key={index}
									entry={{
										productDetails: productDetails,
										compData: compData,
									}}
									draw={draw}
									height={900}
									width={700}
								/>
							);
						})}
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
	);
};

export default AddProductItemForUser;
