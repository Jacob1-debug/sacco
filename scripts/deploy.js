async function main() {
  const SaccoToken = await ethers.getContractFactory("SaccoToken");
  const initialSupply = ethers.utils.parseUnits("1000000", 18); // 1 million tokens
  const maxTokensForSale = ethers.utils.parseUnits("1000000", 18); // 1 million tokens
  const saccoToken = await SaccoToken.deploy(initialSupply, maxTokensForSale);
  await saccoToken.deployed();

  const abi = SaccoToken.abi;

  console.log("SaccoToken deployed to:", saccoToken.address);
  console.log("ABI:", JSON.stringify(abi));

  console.log("Initial Supply:", initialSupply.toString());
  console.log("Max Tokens for Sale:", maxTokensForSale.toString());

  // Get the token name from the contract
  const tokenName = await saccoToken.name();
  console.log("Token Name:", tokenName);

  // Get the token symbol from the contract
  const tokenSymbol = await saccoToken.symbol();
  console.log("Token Symbol:", tokenSymbol);

  // Get the total supply from the contract
  const totalSupply = await saccoToken.totalSupply();
  console.log("Total Supply:", totalSupply.toString());

  // Get the balance of the owner
  const ownerBalance = await saccoToken.balanceOf(saccoToken.address);
  console.log("Owner Balance:", ownerBalance.toString());

  // Get the balance of a specific address
  const userAddress = "0x..."; // Replace with the address you want to check
  const userBalance = await saccoToken.balanceOf(userAddress);
  console.log("User Balance:", userBalance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });