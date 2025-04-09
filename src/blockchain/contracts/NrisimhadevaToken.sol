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
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
    
    function registerPixKey(string calldata pixKey) external {
        pixKeys[msg.sender] = pixKey;
    }
    
    function issueTokens(address to, uint256 amount, string calldata transactionId) external onlyRole(ORACLE_ROLE) {
        uint256 tokens = amount * 10 ** decimals();
        _mint(to, tokens);
        emit TokensIssued(to, amount, transactionId);
    }
    
    function redeemTokens(uint256 amount) external {
        uint256 tokens = amount * 10 ** decimals();
        require(balanceOf(msg.sender) >= tokens, "Insufficient balance");
        require(bytes(pixKeys[msg.sender]).length > 0, "No PIX key registered");
        
        _burn(msg.sender, tokens);
        emit TokensRedeemed(msg.sender, amount, pixKeys[msg.sender]);
    }
    
    function addOracle(address oracle) external onlyRole(ADMIN_ROLE) {
        grantRole(ORACLE_ROLE, oracle);
    }
}
