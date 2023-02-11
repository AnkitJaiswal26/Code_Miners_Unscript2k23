import supplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import companyNFT from "../artifacts/contracts/CompanyNFT.sol/CompanyNFT.json";

export const SupplyChainAddress = "0xa831F622bee086344C4ff686710BFDc5D677Bb46";
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
