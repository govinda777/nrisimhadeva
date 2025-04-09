// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract NrisimhadevaToken is ERC20, AccessControl {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    // Mapping to store PIX keys for redemption
    mapping(address => string) public pixKeys;
    
    event TokensIssued(address indexed to, uint256 amount, string transactionId);
    event TokensRedeemed(address indexed from, uint256 amount, string pixKey);
    
    constructor() ERC20("Nrisimhadeva Token", "NVD") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    // Register PIX key for this wallet
    function registerPixKey(string calldata pixKey) external {
        pixKeys[msg.sender] = pixKey;
    }
    
    // Issue tokens after confirming PIX payment; callable only by accounts with ORACLE_ROLE
    function issueTokens(address to, uint256 amount, string calldata transactionId) external onlyRole(ORACLE_ROLE) {
        _mint(to, amount * 10 ** decimals());
        emit TokensIssued(to, amount, transactionId);
    }
    
    // Redeem tokens in exchange for a PIX payment
    function redeemTokens(uint256 amount) external {
        uint256 tokenAmount = amount * 10 ** decimals();
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient balance");
        require(bytes(pixKeys[msg.sender]).length > 0, "No PIX key registered");
        
        _burn(msg.sender, tokenAmount);
        emit TokensRedeemed(msg.sender, amount, pixKeys[msg.sender]);
    }
    
    // Allow an admin to add an oracle address
    function addOracle(address oracle) external onlyRole(ADMIN_ROLE) {
        grantRole(ORACLE_ROLE, oracle);
    }
}
