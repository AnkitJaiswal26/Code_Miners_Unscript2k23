import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { useAuth } from "../../../Context/AuthContext";
import { useSupplyChainContext } from "../../../Context/SupplyChainContext";
import { v4 as uuidv4 } from "uuid";
import * as xlsx from "xlsx";
import template from "../../../images/template.jpg";
import ProductCanvas from "../Products/ProductCanvas";
const AddProductItem = () => {
	const [products, setProducts] = useState([]);
	const [productDetails, setProductDetails] = useState({});
	const [companyNFTAdd, setCompanyNFTAdd] = useState("");

	const [compData, setCompData] = useState();
	const [quantity, setQuantity] = useState(0);
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
		fetchProductById,
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

	const [productItems, setProductItems] = useState([]);

	useEffect(() => {
		if (currentAccount) fetchUser();
	}, [currentAccount]);

	const fetchProducts = useCallback(async () => {
		console.log("Hello");
		const productId = window.location.pathname.split("/")[3];
		const result = await fetchProductById(
			companyNFTAdd,
			parseInt(productId)
		);
		console.log(result);
		setProductDetails(result);
		console.log("-----------------------");
		console.log(result);
		console.log("-----------------------");

		const data = await fetchProductItemsByProductId(
			companyNFTAdd,
			productId
		);

		setProductItems(data);

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

	const addNewItems = async (e) => {
		e.preventDefault();
		try {
			var pubKeys = [];
			var privateKeys = [];
			var tokenURI = [];

			const codesURLList = [];

			console.log(quantity);

			for (let i = 0; i < quantity; i++) {
				console.log("Hello");
				const publicKey = uuidv4();
				const privateKey = uuidv4();
				pubKeys.push(publicKey);
				privateKeys.push(privateKey);
				tokenURI.push("");
				codesURLList.push({
					publicURL: `http://localhost:3000/verify/${compData.comAdd}/${publicKey}`,
					privateURL: `http://localhost:3000/buy/${compData.comAdd}/${privateKey}`,
				});
			}

			var canvases = document.getElementsByClassName("templateCanvas");
			console.log(canvases);

			var qualities = [];
			var cids = [];

			for (let i = 0; i < canvases.length; i++) {
				var url = canvases[i].toDataURL("image/png");

				let file = dataURLtoFile(url, "warranty.png");
				const cid = await uploadFilesToIPFS([file]);
				console.log(cid);
				cids.push(cid);
				qualities.push("Good");
			}

			await addBulkProducts(
				companyNFTAdd,
				productDetails.productId,
				qualities,
				productDetails.price,
				pubKeys,
				privateKeys,
				cids
			);

			const worksheet = xlsx.utils.json_to_sheet(codesURLList);
			const workbook = xlsx.utils.book_new();
			xlsx.utils.book_append_sheet(workbook, worksheet, "Codes URL");
			xlsx.writeFile(workbook, `codes-${productDetails.productId}.xlsx`);
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
							<div className="flex justify-center mt-2">
								<input
									type="text"
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									value={quantity}
									onChange={(e) =>
										setQuantity(e.target.value)
									}
								/>
								<button
									type="button"
									className="mb-6 inline-block px-16 py-3 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
									style={{
										backgroundColor: "#22a6c7",
									}}
									onClick={addNewItems}
								>
									Add
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="">
					{Array(parseInt(quantity))
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

export default AddProductItem;
