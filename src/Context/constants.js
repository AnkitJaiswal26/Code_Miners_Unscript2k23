import supplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import companyNFT from "../artifacts/contracts/CompanyNFT.sol/CompanyNFT.json";

export const SupplyChainAddress = "0x556928a0C773A2d4491c4dc5D0c2385Dec7F9AcA";
export const SupplyChainABI = supplyChain.abi;
export const CompanyNFTABI = companyNFT.abi;

export const ChainId = {
	MAINNET: 1,
	GOERLI: 5,
	POLYGON_MUMBAI: 80001,
	POLYGON_MAINNET: 137,
};

export let activeChainId = ChainId.POLYGON_MUMBAI;
export const supportedChains = [
	ChainId.GOERLI,
	ChainId.POLYGON_MAINNET,
	ChainId.POLYGON_MUMBAI,
];