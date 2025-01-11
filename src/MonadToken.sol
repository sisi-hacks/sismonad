// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MonadToken is ERC20 {
    uint32 internal constant WINDOW = 2 days;
    uint256 public constant FAUCET_DRIP = 200e18;
    uint256 public constant FAUCET_LIMIT = 1_000_000e18;

    mapping(address minter => uint256 timeOflastMintTime) public lastMintTime;
    
    error OverLimit();
    error WindowNotElapsed();

    constructor()  ERC20("MonadToken", "MK") { }

    function mint() public {
        if ((block.timestamp - lastMintTime[msg.sender]) < WINDOW) revert WindowNotElapsed();
        if ((totalSupply() + FAUCET_DRIP) > FAUCET_LIMIT) revert OverLimit();
        
        lastMintTime[msg.sender] = block.timestamp;
        _mint(msg.sender, FAUCET_DRIP);
    }
}