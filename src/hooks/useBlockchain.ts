import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import Auctions from '../../build/contracts/Auctions.json';

const contractAddress = '';

const useBlockchain = () => {
  const { account, library: provider } = useWeb3React();

  const initContract = () => {
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, Auctions.abi, signer);
  };

  return {
    contract: initContract(),
    account
  };
};

export default useBlockchain;