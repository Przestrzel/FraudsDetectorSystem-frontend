import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { getContractAddress } from '@ethersproject/address';
import Auctions from '../build/contracts/Auctions.json';

const useBlockchain = () => {
  const { account, library: provider } = useWeb3React();

  const initContract = async () => {
    if(!provider) {
      return;
    }

    const signer = provider.getSigner();
    const transactionCounts = await signer.getTransactionCount();
    const contractAddress = getContractAddress({
      from: account,
      nonce: transactionCounts,
    });

    return new ethers.Contract(contractAddress, Auctions.abi, signer);
  };

  const addMoney = () => {
    if(!account) throw new Error('No account connected');

    const web2 = new Web3.providers.HttpProvider('http://localhost:8545');
    const web4 = new Web3(web2);

    web4.eth.getAccounts(() => {
      web4.eth.sendTransaction({
        from: web4.eth.accounts[ 0 ],
        to: account,
        value: web4.toWei(10.0, 'ether'),
      },
      (err, transactionHash) => {
        if (!err)
          console.log(transactionHash + ' success');
      });
    });
  };

  const registerAdvertiser = async (name: string, city: string) => {
    const contract = await initContract();
    if(!contract) return;

    contract.deployed().then(instance => {
      instance.registerAdvertiser(name, city, { from: account });
    });
  };

  return {
    contract: initContract(),
    account,
    addMoney,
    registerAdvertiser
  };
};

export default useBlockchain;