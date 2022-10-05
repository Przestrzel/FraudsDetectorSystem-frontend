import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import Web3 from 'web3';
import Auctions from '../build/contracts/Auctions.json';

const contractAddress = '';

const useBlockchain = () => {
  const { account, library: provider } = useWeb3React();

  const initContract = () => {
    const signer = provider.getSigner();
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

  return {
    contract: initContract(),
    account,
    addMoney
  };
};

export default useBlockchain;