// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CompanyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string[]) itemsHistory;
    enum State {
        Manufactured, // 0
        SoldToSeller,
        Packed,
        SellerShipped,
        SellerRecieved,
        Sold, // 4
        Shipped, // 5
        Received // 6
    }

    struct Product {
        uint256 productId;
        string name;
        uint256 price;
        address company;
        string description;
        string cid;
    }

    struct ProductItem {
        uint256 upc;
        address payable ownerID;
        address payable companyAdd;
        uint256 productID;
        string quality;
        uint256 productPrice;
        State itemState;
        address payable distributorAdd;
        address payable retailerAdd;
        address payable consumerAdd;
        string cid;
        string privateKey;
        string pubKey;
    }

    address private company;
    string companyName;
    string cin;

    address[] private products;
    uint256 private _totalSupply;
    uint256 private productCount;

    mapping(uint256 => ProductItem) items;
    mapping(uint256 => Product) private productsMapping;
    mapping(string => uint256) privateKeyToProductItemMapping;
    mapping(string => string) pubKeyToPrivateKeyMapping;

    constructor(
        string memory _companyName,
        string memory _cin,
        string memory companySymbol,
        address owner
    ) ERC721(_companyName, companySymbol) {
        company = owner;
        companyName = _companyName;
        cin = _cin;
    }

    function addProduct(
        string memory name,
        uint256 price,
        string memory description,
        string memory cid
    ) public {
        productsMapping[productCount++] = Product(
            productCount,
            name,
            price,
            msg.sender,
            description,
            cid
        );
    }

    function fetchCompanyDetails()
        public
        view
        returns (address, string memory, string memory)
    {
        return (company, companyName, cin);
    }

    function mint(
        uint256 productID,
        string memory quality,
        uint256 price,
        State state,
        string memory pubKey,
        string memory privateKey,
        string memory cid
    ) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, cid);

        items[newItemId] = ProductItem({
            upc: newItemId,
            ownerID: payable(msg.sender),
            companyAdd: payable(msg.sender),
            productID: productID,
            quality: quality,
            productPrice: price,
            itemState: state,
            distributorAdd: payable(address(0)),
            retailerAdd: payable(address(0)),
            consumerAdd: payable(address(0)),
            cid: cid,
            privateKey: privateKey,
            pubKey: pubKey
        });

        privateKeyToProductItemMapping[privateKey] = newItemId;
        pubKeyToPrivateKeyMapping[pubKey] = privateKey;
    }

    function addBulkProducts(
        uint256 productId,
        string[] memory quality,
        uint256 price,
        string[] memory pubKeys,
        string[] memory privateKeys,
        string[] memory cids
    ) public {
        for (uint256 i = 0; i < pubKeys.length; i++) {
            mint(
                productId,
                quality[i],
                price,
                State.Manufactured,
                pubKeys[i],
                privateKeys[i],
                cids[i]
            );
        }
    }

    function growNFT(
        uint256 tokenId,
        string memory tokenURI,
        State state
    ) private {
        require(
            items[tokenId].itemState != State.Received,
            "It id impossible to grow more"
        );

        // _setTokenURI(tokenId, tokenURI);

        if (state == State.SellerRecieved) {
            items[tokenId].retailerAdd = payable(msg.sender);
        } else if (state == State.SellerShipped) {
            items[tokenId].distributorAdd = payable(msg.sender);
        }

        if (state == State.SoldToSeller || state == State.Sold) {
            items[tokenId].ownerID = payable(msg.sender);
        }

        items[tokenId].cid = tokenURI;
        items[tokenId].itemState = state;
    }

    function scanAndGrow(
        string memory pubKey,
        string memory tokenURI,
        State state
    ) public {
        uint256 itemId = privateKeyToProductItemMapping[
            pubKeyToPrivateKeyMapping[pubKey]
        ];
        growNFT(itemId, tokenURI, state);
    }

    function buyProductForSeller(
        uint256 itemId,
        string memory tokenURI
    ) public payable {
        growNFT(itemId, tokenURI, State.SoldToSeller);
    }

    function buyBulkProductsForSeller(
        uint256 productId,
        uint256 count,
        string memory tokenURI
    ) public payable {
        require(msg.value >= (count * productsMapping[productId].price) / 1000);
        payable(company).transfer(msg.value);
        uint256 totalItemCount = _tokenIds.current();
        for (uint256 i = 1; i < totalItemCount + 1 && count > 0; i++) {
            if (
                items[i].productID == productId &&
                items[i].itemState == State.Manufactured
            ) {
                buyProductForSeller(i, tokenURI);
                count -= 1;
            }
        }
    }

    function buyProductForUser(
        uint256 itemId,
        string memory cid
    ) public payable {
        require(
            msg.value >= productsMapping[items[itemId].productID].price / 1000
        );
        payable(items[itemId].ownerID).transfer(msg.value);
        growNFT(itemId, cid, State.Sold);
    }

    function buyProduct(
        string memory privateKey,
        string memory tokenURI
    ) public payable {
        growNFT(
            privateKeyToProductItemMapping[privateKey],
            tokenURI,
            State.Received
        );
    }

    // function transferNFT(
    //     uint256 itemId,
    //     address to,
    //     string memory tokenURI
    // ) public {
    //     if (items[itemId].ownerID == msg.sender) {
    //         items[itemId].ownerID = payable(to);
    //         items[itemId].cid = tokenURI;
    //     }

    //     _setTokenURI(itemId, tokenURI);
    // }

    function fetchAllProducts() public view returns (Product[] memory) {
        Product[] memory result = new Product[](productCount);

        for (uint256 i = 0; i < productCount; i++) {
            Product storage cur = productsMapping[i];
            result[i] = cur;
        }

        return result;
    }

    // function fetchAllProductItemsByProductIdForUser(
    //     uint256 productId
    // ) public view returns (ProductItem[] memory) {
    //     uint256 totalCount = _tokenIds.current();

    //     uint256 proCount;
    //     for (uint256 i = 0; i < totalCount; i++) {
    //         if (
    //             items[i].productID == productId &&
    //             items[i].itemState == State.SellerRecieved
    //         ) {
    //             proCount += 1;
    //         }
    //     }

    //     ProductItem[] memory result = new ProductItem[](proCount);
    //     proCount = 0;

    //     for (uint256 i = 0; i < totalCount; i++) {
    //         if (
    //             items[i].productID == productId &&
    //             items[i].itemState == State.SellerRecieved
    //         ) {
    //             ProductItem storage cur = items[i];
    //             result[proCount++] = cur;
    //         }
    //     }

    //     return result;
    // }

    function fetchAllUserProducts() public view returns (ProductItem[] memory) {
        uint256 totalCount = _tokenIds.current();

        uint256 proCount;
        for (uint256 i = 1; i < totalCount + 1; i++) {
            if (items[i].ownerID == msg.sender) {
                proCount += 1;
            }
        }

        ProductItem[] memory result = new ProductItem[](proCount);
        proCount = 0;

        for (uint256 i = 1; i < totalCount + 1; i++) {
            if (items[i].ownerID == msg.sender) {
                ProductItem storage cur = items[i];
                result[proCount++] = cur;
            }
        }

        return result;
    }

    function fetchProductItemById(
        uint256 itemId
    ) public view returns (ProductItem memory) {
        return items[itemId];
    }

    function fetchProductItemByPrivateKey(
        string memory privateKey
    ) public view returns (uint256 id) {
        return privateKeyToProductItemMapping[privateKey];
    }

    function fetchProductItemByPublicKey(
        string memory publicKey
    ) public view returns (uint256 id) {
        return
            privateKeyToProductItemMapping[
                pubKeyToPrivateKeyMapping[publicKey]
            ];
    }

    function fetchProductById(uint256 id) public view returns (Product memory) {
        return productsMapping[id];
    }

    function fetchAllProductItemsById(
        uint256 productId
    ) public view returns (ProductItem[] memory) {
        uint256 totalCount = _tokenIds.current();

        uint256 proCount;
        for (uint256 i = 1; i <= totalCount; i++) {
            if (items[i].productID == productId) {
                proCount += 1;
            }
        }

        ProductItem[] memory result = new ProductItem[](proCount);
        proCount = 0;

        for (uint256 i = 1; i <= totalCount; i++) {
            if (items[i].productID == productId) {
                ProductItem storage cur = items[i];
                result[proCount++] = cur;
            }
        }

        return result;
    }
}
