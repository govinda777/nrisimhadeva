// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Código do contrato NrisimhadevaOracle
contract NrisimhadevaOracle {
    address public owner;
    uint256 public latestValue;
    uint256 public lastUpdated;

    event ValueUpdated(uint256 newValue, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can update the value");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }

    // Update the oracle value, only callable by the owner
    function updateValue(uint256 newValue) external onlyOwner {
        latestValue = newValue;
        lastUpdated = block.timestamp;
        emit ValueUpdated(newValue, block.timestamp);
    }

    // Get the current oracle value and last update timestamp
    function getLatestValue() external view returns (uint256, uint256) {
        return (latestValue, lastUpdated);
    }
}
