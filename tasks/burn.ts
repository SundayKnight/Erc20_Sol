import { task } from 'hardhat/config'
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';
import { contractAddress } from '../hardhat.config';

task('burn', 'Burns tokens')
    .addParam('amount', 'Token amount to burn')
	.setAction(async ({amount}, { ethers }) => {
        const myToken = await ethers.getContractFactory('MyToken')
        const contract = myToken.attach(contractAddress!);

        const contractTx: ContractTransaction = await contract.burn(amount);
        const contractReceipt: ContractReceipt = await contractTx.wait();
        const event = contractReceipt.events?.find(event => event.event === 'Transfer');
        const eFrom: Address = event?.args!['from'];
        const eTo: Address = event?.args!['to'];
        const eAmount: BigNumber = event?.args!['value'];            
    	console.log(`Transfer from: ${eFrom}`)
    	console.log(`Transfer to: ${eTo}`)
    	console.log(`Amount: ${eAmount}`)
})

