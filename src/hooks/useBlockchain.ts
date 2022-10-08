import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { NotificationType } from 'types/app.types';
import Web3 from 'web3';
import Auctions from '../build/contracts/Auctions.json';
import useNotification from './useNotification';

const contractAddress = '';

const useBlockchain = () => {
  const { account, library: provider } = useWeb3React();
  const { notify } = useNotification();

  const initContract = () => {
    if(!provider){
      return null;
    }
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, Auctions.abi, signer);
  };

  const addMoney = () => {
    if(!account) {
      notify('You have to connect with metamask', NotificationType.ERROR);
      return;
    };

    const web2 = new Web3.providers.HttpProvider('http://localhost:8545');
    const web4 = new Web3(web2);

    web4.eth.getAccounts(() => {
      web4.eth.sendTransaction({
        from: web4.eth.accounts[ 0 ],
        to: account,
        value: web4.toWei(1.0, 'ether'),
      },
      (err) => {
        if (!err)
          notify('You have 1 ETH added', NotificationType.SUCCESS);

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