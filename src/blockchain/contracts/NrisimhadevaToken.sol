// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract NrisimhadevaToken is ERC20, AccessControl {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    mapping(address => string) public pixKeys;
    
    event TokensIssued(address indexed to, uint256 amount, string transactionId);
    event TokensRedeemed(address indexed from, uint256 amount, string pixKey);
    
    constructor() ERC20("Nrisimhadeva Token", "NVD") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // Mint de 1 milhão com 18 decimais
    }
    
    function registerPixKey(string calldata pixKey) external {
        pixKeys[msg.sender] = pixKey;
    }
    
    function issueTokens(address to, uint256 amount, string calldata transactionId) external onlyRole(ORACLE_ROLE) {
        _mint(to, amount * 10 ** decimals());
        emit TokensIssued(to, amount, transactionId);
    }
    
    function redeemTokens(uint256 amount) external {
        uint256 tokenAmount = amount;
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient balance");
        require(bytes(pixKeys[msg.sender]).length > 0, "No PIX key registered");
        
        _burn(msg.sender, tokenAmount);
        emit TokensRedeemed(msg.sender, tokenAmount / 10 ** decimals(), pixKeys[msg.sender]);
    }
    
    function addOracle(address oracle) external onlyRole(ADMIN_ROLE) {
        grantRole(ORACLE_ROLE, oracle);
    }
}
