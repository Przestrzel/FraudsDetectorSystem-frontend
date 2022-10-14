import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { NotificationType } from 'types/app.types';
import { contractAddress, ganacheUrl } from 'utils/config.utils';
import Web3 from 'web3';
import Auctions from '../build/contracts/Auctions.json';
import useNotification from './useNotification';

const useBlockchain = () => {
  const { account, library: provider } = useWeb3React();
  const { notify } = useNotification();

  const initContract = async () => {
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

    const web2 = new Web3.providers.HttpProvider(ganacheUrl);
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