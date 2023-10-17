import { task } from 'hardhat/config'
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';
import { contractAddress } from '../hardhat.config';

task ('transfer', 'Transfer from account to another account')
	.addParam('to', 'Recipent user address')
	.addParam('amount', 'Amount')
	.setAction(async ({to, amount}, { ethers }) => {
        const myToken = await ethers.getContractFactory('MyToken')
        const contract = myToken.attach(contractAddress!);

        const contractTx: ContractTransaction = await contract.transfer(to, amount);
        const contractReceipt: ContractReceipt = await contractTx.wait();
        const event = contractReceipt.events?.find(event => event.event === 'Transfer');
        const eFrom: Address = event?.args!['from'];
        const eTo: Address = event?.args!['to'];
        const eAmount: BigNumber = event?.args!['value'];            
    	console.log(`Transfer from: ${eFrom}`)
    	console.log(`Transfer to: ${eTo}`)
    	console.log(`Amount: ${eAmount}`)
})
