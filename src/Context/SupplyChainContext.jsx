import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import Wenb3Model from "web3modal";
import {
	activeChainId,
	SupplyChainABI,
	SupplyChainAddress,
	CompanyNFTABI,
} from "./constants";
import SmartAccount from "@biconomy/smart-account";
import { ChainId } from "@biconomy/core-types";
import { useAuth } from "./AuthContext";
import { Web3Storage } from "web3.storage";

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(SupplyChainAddress, SupplyChainABI, signerOrProvider);

const fetchCompanyNFT = (contractAddress, signerOrProvider) =>
	new ethers.Contract(contractAddress, CompanyNFTABI, signerOrProvider);

const options = {
	activeNetworkId: ChainId.POLYGON_MUMBAI,
	supportedNetworksIds: [
		ChainId.GOERLI,
		ChainId.POLYGON_MAINNET,
		ChainId.POLYGON_MUMBAI,
	],
	networkConfig: [
		{
			chainId: ChainId.POLYGON_MUMBAI,
			dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3",
		},
	],
};

export const SupplyChainContext = React.createContext();

export const useSupplyChainContext = () => useContext(SupplyChainContext);

export const SupplyChainProvider = ({ children }) => {
	const web3AccessToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFjNjkxYTc1NTFBODU3MzIzMTE2MWZEMzUyMUFEQ0MyNWFEQzIyOWMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzM2MjY2MzYyMzQsIm5hbWUiOiJWSlRJSGFjayJ9.uy6sLbmvqoxFA6103tzsK-Ga0H_x_M9z_iYDoK4sPp0";
	const web3Storage = new Web3Storage({ token: web3AccessToken });
	const { currentAccount } = useAuth();

	const connectingWithSmartContract = async () => {
		try {
			const web3Modal = new Wenb3Model();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchContract(signer);
			return contract;
		} catch (error) {
			console.log("Something went wrong while connecting with contract!");
		}
	};

	const connectingWithCompanyNFT = async (contractAddress) => {
		try {
			const web3Modal = new Wenb3Model();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchCompanyNFT(contractAddress, signer);
			return contract;
		} catch (error) {
			console.log("Something went wrong while connecting with contract!");
		}
	};

	const isOwnerAddress = async () => {
		const contract = await connectingWithSmartContract();
		const data = await contract.OwnerIs();
		console.log(data);
		return data;
	};

	const registerUser = async (
		userAdd,
		name,
		emailId,
		mobileNo,
		gender,
		age
	) => {
		const contract = await connectingWithSmartContract();

		const web3Modal = new Wenb3Model();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		let smartAccount = new SmartAccount(provider, options);
		smartAccount = await smartAccount.init();

		const data = contract.interface.encodeFunctionData("registerUser", [
			userAdd,
			name,
			emailId,
			mobileNo,
			gender,
			age,
		]);

		const tx1 = {
			to: SupplyChainAddress,
			data,
		};

		const txResponse = await smartAccount.sendGaslessTransaction({
			transaction: tx1,
		});
		console.log(txResponse);
	};

	const registerCompany = async (comAdd, name, cin) => {
		const contract = await connectingWithSmartContract();
		if (currentAccount) {
			const company = await contract.registerCompany(comAdd, name, cin);
			console.log(company);
		}
	};

	const registerSeller = async (sellerAdd, sellerName, mobileNo, email) => {
		const contract = await connectingWithSmartContract();
		if (currentAccount) {
			const seller = await contract.registerSeller(
				sellerAdd,
				sellerName,
				mobileNo,
				email
			);
			console.log(seller);
		}
	};

	const acceptCompany = async (comAdd) => {
		const contract = await connectingWithSmartContract();
		if (currentAccount) {
			await contract.acceptCompany(comAdd);
		}
	};

	const rejectCompany = async (comAdd) => {
		const contract = await connectingWithSmartContract();
		if (currentAccount) {
			await contract.rejectCompany(comAdd);
		}
	};

	const acceptSeller = async (comAdd) => {
		const contract = await connectingWithSmartContract();
		if (currentAccount) {
			await contract.acceptSeller(comAdd);
		}
	};

	const rejectSeller = async (comAdd) => {
		const contract = await connectingWithSmartContract();
		if (currentAccount) {
			await contract.rejectSeller(comAdd);
		}
	};

	const fetchUserByAddress = async (userAddress) => {
		const contract = await connectingWithSmartContract();
		const user = await contract.fetchUserByAddress(userAddress);
		return user;
	};

	const fetchCompanyByAddress = async (companyAddress) => {
		const contract = await connectingWithSmartContract();
		const company = await contract.fetchCompanyByAddress(companyAddress);
		console.log(company);
		return company;
	};

	const fetchSellerByAddress = async (companyAddress) => {
		const contract = await connectingWithSmartContract();
		const seller = await contract.fetchSellerByAddress(companyAddress);
		console.log(seller);
		return seller;
	};

	const fetchActiveCompanyRequests = async () => {
		const contract = await connectingWithSmartContract();
		const requests = await contract.fetchActiveCompanyRequests();
		return requests;
	};

	const fetchActiveSellerRequests = async () => {
		const contract = await connectingWithSmartContract();
		const requests = await contract.fetchActiveSellerRequests();
		return requests;
	};

	const fetchAllCompanies = async () => {
		const contract = await connectingWithSmartContract();
		const requests = await contract.fetchAllCompanies();
		return requests;
	};

	const fetchCompanyUsingCIN = async (cin) => {
		const contract = await connectingWithSmartContract();
		const company = await contract.fetchCompanyUsingCIN(cin);
		return company;
	};

	const fetchCompanyNFTAddress = async (companyAddr) => {
		const contract = await connectingWithSmartContract();
		const company = await contract.fetchCompanyNFTAddress(companyAddr);
		return company;
	};

	const addProduct = async (
		contractAddress,
		name,
		price,
		productDesc,
		cid
	) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		await contract.addProduct(name, price, productDesc, cid);
	};

	// const mint = async (
	// 	contractAddress,
	// 	productId,
	// 	manDate,
	// 	exDate,
	// 	pubKey,
	// 	privateKey,
	// 	tokenURI,
	// 	validity
	// ) => {
	// 	const contract = await connectingWithCompanyNFT(contractAddress);
	// 	await contract.mint(
	// 		productId,
	// 		manDate,
	// 		exDate,
	// 		pubKey,
	// 		privateKey,
	// 		tokenURI,
	// 		validity
	// 	);
	// };

	const addBulkProducts = async (
		contractAddress,
		productId,
		qualities,
		price,
		pubKeys,
		privateKeys,
		tokenURI
	) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		await contract.addBulkProducts(
			productId,
			qualities,
			price,
			pubKeys,
			privateKeys,
			tokenURI
		);
	};

	const fetchProductById = async (contractAddress, productId) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchProductById(productId);
		return data;
	};

	const fetchAllProducts = async (contractAddress) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchAllProducts();
		return data;
	};

	const fetchAllProductItemsByProductId = async (
		contractAddress,
		productId
	) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchAllProductItemsByProductId(productId);
		return data;
	};

	const fetchProductItemById = async (contractAddress, itemId) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchProductItemById(itemId);
		return data;
	};

	const fetchProductItemByPrivateKey = async (
		contractAddress,
		privateKey
	) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchProductItemByPrivateKey(privateKey);
		return data;
	};

	const fetchProductItemsByProductId = async (contractAddress, productId) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchAllProductItemsById(productId);
		return data;
	};

	const fetchProductItemByPublicKey = async (contractAddress, publicKey) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchProductItemByPublicKey(publicKey);
		return data;
	};

	const uploadFilesToIPFS = async (file) => {
		try {
			const cid = await web3Storage.put(file);
			return cid;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchAllCompaniesNFT = async () => {
		const contract = await connectingWithSmartContract();
		const data = await contract.fetchAllCompaniesNFT();
		console.log(data);
		return data;
	};

	const fetchCompanyDetails = async (contractAddress) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchCompanyDetails();
		return data;
	};

	const buyBulkProductsForSeller = async (
		contractAddress,
		productId,
		count,
		cids
	) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.buyBulkProductsForSeller(
			productId,
			count,
			cids
		);
		return data;
	};

	const buyProduct = async (contractAddress, privateKey, cid) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.buyProduct(privateKey, cid);
		return data;
	};

	const scanAndGrow = async (contractAddress, pubKey, tokenURI) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.scanAndGrow(pubKey, tokenURI);
		return data;
	};

	return (
		<SupplyChainContext.Provider
			value={{
				scanAndGrow,
				buyProduct,
				buyBulkProductsForSeller,
				fetchCompanyDetails,
				fetchAllCompaniesNFT,
				connectingWithSmartContract,
				fetchUserByAddress,
				registerUser,
				registerCompany,
				acceptCompany,
				rejectCompany,
				fetchCompanyByAddress,
				fetchActiveCompanyRequests,
				fetchAllCompanies,
				fetchCompanyUsingCIN,
				fetchCompanyNFTAddress,
				addProduct,
				fetchProductById,
				fetchAllProductItemsByProductId,
				fetchProductItemById,
				fetchProductItemByPrivateKey,
				fetchProductItemByPublicKey,
				uploadFilesToIPFS,
				registerSeller,
				isOwnerAddress,
				fetchActiveSellerRequests,
				acceptSeller,
				fetchSellerByAddress,
				rejectSeller,
				fetchAllProducts,
				addBulkProducts,
				fetchProductItemsByProductId,
			}}
		>
			{children}
		</SupplyChainContext.Provider>
	);
};
