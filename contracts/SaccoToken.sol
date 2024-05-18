pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SaccoToken is ERC20 {
    uint256 public maxTokensForSale;

    constructor(uint256 initialSupply, uint256 _maxTokensForSale) 
        ERC20("SaccoToken", "SACCO")
    {
        _mint(msg.sender, initialSupply);
        maxTokensForSale = _maxTokensForSale;
    }

    function mint(address to, uint256 amount) public {
        require(totalSupply() + amount <= maxTokensForSale, "Exceeds max tokens for sale");
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function setMaxTokensForSale(uint256 newLimit) public {
        maxTokensForSale = newLimit;
    }
}