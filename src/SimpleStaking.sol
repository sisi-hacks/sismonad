 // SPDX-License-Identifier: MIT
// WARNING this contract has not been independently tested or audited
// DO NOT use this contract with funds of real value until officially tested and audited by an independent expert or group

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SimpleStaking is ERC20 {
    using SafeERC20 for IERC20;

    IERC20 public erc20Contract;

    bool internal locked;
    address public owner;
    bool public timestampSet;
    uint256 public initialTimestamp;
    uint256 public stakingPeriod;
    uint256 public contractBalance;

    mapping(address => uint256) public balances;

    event TokensStaked(address from, uint256 amount);
    event TokensUnstaked(address to, uint256 amount);

    constructor (IERC20 erc20ContractAddress) ERC20 ("Staked Meownad", "sMN") {
        require(address(erc20ContractAddress) != address(0), "ERC20 contract address can not be zero.");
        owner = msg.sender;
        erc20Contract = erc20ContractAddress;
    }

    modifier noReentrant() {
        require(!locked, "No re-entrancy.");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Message sender must be the contract's owner.");
        _;
    }

    modifier timestampNotSet() {
        require(timestampSet == false, "The time stamp has already been set.");
        _;
    }

    modifier timestampIsSet() {
        require(timestampSet == true, "Please set the time stamp first, then try again.");
        _;
    }

    /// @dev Sets the initial timestamp and calculates minimum staking period in seconds i.e. 3600 = 1 hour
    /// @param _stakingPeriodInSeconds  amount of seconds to add to the initial timestamp i.e. 
    ///                                 we are essentially creating the minimum staking period here.
    function setTimestamp(uint256 _stakingPeriodInSeconds) public onlyOwner timestampNotSet  {
        timestampSet = true;
        initialTimestamp = block.timestamp;
        stakingPeriod += _stakingPeriodInSeconds;
    }

    /// @dev Tokens are minted on a 1:1 ratio.
    function stakeTokens(uint256 amount) public timestampIsSet noReentrant {
        require(amount <= erc20Contract.balanceOf(msg.sender), "Not enough tokens in your wallet.");
        balances[msg.sender] += amount;
        erc20Contract.safeTransferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, amount);
        emit TokensStaked(msg.sender, amount);
    }

    function unstakeTokens(uint256 smnAmount) internal {
        require(balances[msg.sender] >= smnAmount, "Insufficient token balance.");
        require(block.timestamp >= stakingPeriod, "Tokens are only available after correct time period has elapsed");
        
        _burn(msg.sender, smnAmount);
        balances[msg.sender] -= smnAmount;
        erc20Contract.safeTransfer(msg.sender, smnAmount);
        emit TokensUnstaked(msg.sender, smnAmount);
    }

    /// @dev Transfer accidentally locked ERC20 tokens.
    /// @param token - ERC20 token address.
    /// @param amount of ERC20 tokens to remove.
    function transferAccidentallyLockedTokens(IERC20 token, uint256 amount) public onlyOwner noReentrant {
        require(address(token) != address(0), "Token address can not be zero");
        require(token != erc20Contract, "Token address can not be ERC20 address which was passed into the constructor");
        token.safeTransfer(owner, amount);
    }
}