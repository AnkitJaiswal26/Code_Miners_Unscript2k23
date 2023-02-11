// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
import "./CompanyNFT.sol";

contract SupplyChain {
    address payable owner;

    struct User {
        address userAdd;
        string name;
        uint256 age;
        string email;
        string mobileNo;
    }

    struct Company {
        address comAdd;
        string name;
        string cin;
    }

    struct Seller {
        address sellerAdd;
        string name;
        string email;
        string mobileNo;
    }

    receive() external payable {}

    constructor() {
        owner = payable(msg.sender);
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    uint256 userCount;
    uint256 companyRequestCount;
    uint256 companyCount;
    uint256 sellerCount;
    uint256 sellerRequestCount;

    mapping(uint256 => User) userMapping;
    mapping(uint256 => Company) companyMapping;
    mapping(uint256 => Company) companyRequestMapping;
    mapping(uint256 => Seller) sellerMapping;
    mapping(uint256 => Seller) sellerRequestMapping;
    mapping(uint256 => CompanyNFT) companyNFTMapping;

    mapping(address => uint256) userAddressToIdMapping;
    mapping(address => uint256) companyAddressToIdMapping;
    mapping(address => uint256) companyAddressToIdRequestMapping;
    mapping(address => uint256) sellerAddressToIdMapping;
    mapping(address => uint256) sellerAddressToIdRequestMapping;

    function registerUser(
        address userAdd,
        string memory name,
        string memory emailId,
        string memory mobileNo,
        uint256 age
    ) public {
        userMapping[userCount] = User(userAdd, name, age, emailId, mobileNo);

        userAddressToIdMapping[msg.sender] = userCount++;
    }

    function registerCompany(
        address comAdd,
        string memory name,
        string memory cin
    ) public {
        companyRequestMapping[companyRequestCount] = Company(comAdd, name, cin);
        companyAddressToIdRequestMapping[msg.sender] = companyRequestCount++;
    }

    function registerSeller(
        address sellerAdd,
        string memory name,
        string memory mobileNo,
        string memory emailId
    ) public {
        sellerRequestMapping[sellerRequestCount] = Seller(
            sellerAdd,
            name,
            emailId,
            mobileNo
        );
        sellerAddressToIdRequestMapping[msg.sender] = sellerRequestCount++;
    }

    function acceptCompany(address companyAdd) public isOwner {
        companyMapping[companyCount] = companyRequestMapping[
            companyAddressToIdRequestMapping[companyAdd]
        ];

        companyAddressToIdMapping[companyAdd] = companyCount;

        companyNFTMapping[companyCount] = new CompanyNFT(
            companyMapping[companyCount].name,
            companyMapping[companyCount].cin,
            companyMapping[companyCount].cin,
            companyMapping[companyCount].comAdd
        );
        companyCount += 1;

        companyRequestMapping[
            companyAddressToIdRequestMapping[companyAdd]
        ] = companyRequestMapping[companyRequestCount - 1];
        companyAddressToIdRequestMapping[
            companyRequestMapping[companyRequestCount - 1].comAdd
        ] = companyAddressToIdRequestMapping[companyAdd];

        delete companyRequestMapping[companyRequestCount - 1];
        companyRequestCount -= 1;
    }

    function rejectCompany(address companyAdd) public isOwner {
        companyRequestMapping[
            companyAddressToIdRequestMapping[companyAdd]
        ] = companyRequestMapping[companyRequestCount - 1];
        companyAddressToIdRequestMapping[
            companyRequestMapping[companyRequestCount - 1].comAdd
        ] = companyAddressToIdRequestMapping[companyAdd];

        delete companyRequestMapping[companyRequestCount - 1];
        companyRequestCount -= 1;
    }

    function acceptSeller(address sellerAdd) public isOwner {
        sellerMapping[sellerCount] = sellerRequestMapping[
            sellerAddressToIdRequestMapping[sellerAdd]
        ];

        sellerAddressToIdMapping[sellerAdd] = sellerCount;

        // companyNFTMapping[companyCount] = new CompanyNFT(
        //     companyMapping[companyCount].name,
        //     companyMapping[companyCount].cin,
        //     companyMapping[companyCount].cin,
        //     companyMapping[companyCount].comAdd
        // );
        sellerCount += 1;

        sellerRequestMapping[
            sellerAddressToIdRequestMapping[sellerAdd]
        ] = sellerRequestMapping[sellerRequestCount - 1];
        sellerAddressToIdRequestMapping[
            sellerRequestMapping[sellerRequestCount - 1].sellerAdd
        ] = sellerAddressToIdRequestMapping[sellerAdd];

        delete sellerRequestMapping[sellerRequestCount - 1];
        sellerRequestCount -= 1;
    }

    function rejectSeller(address sellerAdd) public isOwner {
        sellerRequestMapping[
            sellerAddressToIdRequestMapping[sellerAdd]
        ] = sellerRequestMapping[sellerRequestCount - 1];
        sellerAddressToIdRequestMapping[
            sellerRequestMapping[sellerRequestCount - 1].sellerAdd
        ] = sellerAddressToIdRequestMapping[sellerAdd];

        delete sellerRequestMapping[sellerRequestCount - 1];
        sellerRequestCount -= 1;
    }

    function fetchUserByAddress(
        address userAdd
    ) public view returns (User memory) {
        for (uint256 i = 0; i < userCount; i++) {
            if (userMapping[i].userAdd == userAdd) {
                return userMapping[i];
            }
        }

        revert();
    }

    function fetchCompanyByAddress(
        address comAdd
    ) public view returns (Company memory) {
        for (uint256 i = 0; i < companyCount; i++) {
            if (companyMapping[i].comAdd == comAdd) {
                return companyMapping[i];
            }
        }

        revert();
    }

    function fetchSellerByAddress(
        address sellerAdd
    ) public view returns (Seller memory) {
        for (uint256 i = 0; i < sellerCount; i++) {
            if (sellerMapping[i].sellerAdd == sellerAdd) {
                return sellerMapping[i];
            }
        }

        revert();
    }

    function fetchActiveCompanyRequests()
        public
        view
        isOwner
        returns (Company[] memory)
    {
        Company[] memory result = new Company[](companyRequestCount);
        for (uint256 i = 0; i < companyRequestCount; i++) {
            Company storage cur = companyRequestMapping[i];
            result[i] = cur;
        }

        return result;
    }

    function fetchActiveSellerRequests()
        public
        view
        isOwner
        returns (Seller[] memory)
    {
        Seller[] memory result = new Seller[](sellerRequestCount);
        for (uint256 i = 0; i < sellerRequestCount; i++) {
            Seller storage cur = sellerRequestMapping[i];
            result[i] = cur;
        }

        return result;
    }

    // function fetchAllCompanies()
    //     public
    //     view
    //     isOwner
    //     returns (Company[] memory)
    // {
    //     Company[] memory result = new Company[](companyCount);
    //     for (uint256 i = 0; i < companyCount; i++) {
    //         Company storage cur = companyMapping[i];
    //         result[i] = cur;
    //     }

    //     return result;
    // }

    // function fetchCompanyUsingCIN(
    //     string memory cin
    // ) public view returns (Company memory) {
    //     for (uint256 i = 0; i < companyCount; i++) {
    //         if (
    //             keccak256(abi.encodePacked(companyMapping[i].cin)) ==
    //             keccak256(abi.encodePacked(cin))
    //         ) {
    //             return companyMapping[i];
    //         }
    //     }

    //     revert();
    // }

    function fetchAllCompaniesNFT() public view returns (address[] memory) {
        address[] memory result = new address[](companyCount);
        for (uint256 i = 0; i < companyCount; i++) {
            address cur = address(companyNFTMapping[i]);
            result[i] = cur;
        }

        return result;
    }

    function fetchCompanyNFTAddress(
        address companyAddr
    ) public view returns (address) {
        return
            address(companyNFTMapping[companyAddressToIdMapping[companyAddr]]);
    }

    function OwnerIs() public view returns (bool) {
        return owner == msg.sender;
    }
}
