import { ethers, run, network } from "hardhat";

const delay = async (time:number) => {
  return new Promise((resolve:any) => {
    setInterval(() =>{
      resolve()
    }, time)
  })
}

async function main() {
  const name = "MyToken";
  const symbol = "MTK";
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", (await deployer.address).toString()); //0x64Bf245083fC962Ec1D298a6b119dB55De29aB3D
  //0xFcdb47c4dD05FEB2afcFE37aeb7B7aEdE5646AC6 - metamask
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(name,symbol);

  await myToken.deployed();

  console.log(
    `MyToken contract deployed to ${myToken.address}`
  );
  console.log(`wait for delay...`)
    await delay(15000) //15 secs
    console.log('starting verufy token...')
    try{
      await run('verify:verify',{
        address: myToken!.address,
        contract: 'contracts/MyToken.sol:MyToken',
        constructorArguments: [name,symbol]
      });
      console.log('verify success')
    } catch(e:any){
      console.log(e.message)
    }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
