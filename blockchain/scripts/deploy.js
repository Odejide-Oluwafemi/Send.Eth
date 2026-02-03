const runMain = async () => {
  try {
    await main();
    process.exit(0);
  }
  catch(error) {
    console.error(error)
    process.exit(1);
  }
}

const main = async () => {
  console.log(main)
  const contract = await hre.ethers.getContractFactory("SendEth");
  const deployedContract = await contract.deploy();
  await deployedContract.deployed();
  console.log(deployedContract.address);
}