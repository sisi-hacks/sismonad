// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MeownadToken is ERC20 {
    uint32 internal constant WINDOW = 12 hours;
    uint256 public constant FAUCET_DRIP = 200e18;
    uint256 public constant FAUCET_LIMIT = 5_000_000e18;

    mapping(address => uint256) public lastMintTime;
    
    error OverLimit();
    error WindowNotElapsed();

    constructor() ERC20("Meownad Token", "MN") {
        _mint(msg.sender, 7_000_000e18);
    }

    /// @notice Allows users to mint new tokens if the window has elapsed and the faucet limit is not exceeded
    function mint() public {
        if (block.timestamp < lastMintTime[msg.sender] + WINDOW) revert WindowNotElapsed();
        if ((totalSupply() + FAUCET_DRIP) > FAUCET_LIMIT) revert OverLimit();
        
        lastMintTime[msg.sender] = block.timestamp;
        _mint(msg.sender, FAUCET_DRIP);
    }
}