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
          notify('Doładowałeś 1 ETH do konta', NotificationType.INFO);
      });
    });
  };

  const registerAdvertiser = async (name: string, city: string) => {
    const contract = await initContract();
    if(!contract) return;

    contract.deployed().then(instance => {
      instance.registerAdvertiser(name, city, { from: account });
    }).catch(err => {
      notify('Transakcja nie powiodła się', NotificationType.ERROR);
      if(err.message.includes('Name has to be provided')){
        notify('Nazwa musi być podana', NotificationType.ERROR);
      }
      else if(err.message.includes('City has to be provided')) {
        notify('Miasto musi być podane', NotificationType.ERROR);
      }
      else if (err.message.includes('Advertiser with this account is already registered')) {
        notify('Nie można utworzyć dwóch kont z tym samym adresem', NotificationType.ERROR);
      }
    });
  };

  const registerOfferent = async (name: string, NIP: string, owner: string) => {
    const contract = await initContract();
    if(!contract) return;

    contract.deployed().then(instance => {
      instance.registerOfferent(name, NIP, owner, { from: account });
    }).catch((err) => {
      notify('Transakcja nie powiodła się', NotificationType.ERROR);
      if(err.message.includes('Name has to be provided')){
        notify('Nazwa jest wymagana', NotificationType.ERROR);
      }
      else if(err.message.includes('City has to be provided')){
        notify('Miasto jest wymagane', NotificationType.ERROR);
      }
      else if (err.message.includes('Advertiser with this account is already registered')){
        notify('Nie można utworzyc dwóch kont z tym samym adresem', NotificationType.ERROR);
      }
    });
  };

  const createAuction = async (id: number, name: string, startDate: string, endDate: string) => {
    const contract = await initContract();
    if(!contract) return;
    contract.deployed().then(instance => {
      instance.createAuction(id, name, startDate, endDate, { from: account });
    }).catch(err => {
      notify('Transakcja nie powiodła się', NotificationType.ERROR);
      if (err.message.includes('You are not registered as an advertiser')) {
        notify('Aby dodać przetarg należy być zarejestrowanym', NotificationType.ERROR);
      }
      else if(err.message.includes('Name has to be provided')){
        notify('Nazwa przetargu jest wymagana', NotificationType.ERROR);
      }
      else if(err.message.includes('End date must be later than start date')){
        notify('Data zamknięcia musi być późniejsza niż data początkowa', NotificationType.ERROR);
      }
      //Delete auction from database
    });
  };

  const makeOffer = async (auctionId: number, name: string, price: number) => {
    const contract = await initContract();
    if(!contract) return;
    contract.deployed().then(instance => {
      instance.makeOffer(auctionId, name, price, { from: account });
    }).catch(err => {
      notify('Transakcja nie powiodła się', NotificationType.ERROR);
      if (err.message.includes('You are not registered as an offerent')) {
        notify('Aby dodać ofertę należy być zarejestrowanym', NotificationType.ERROR);
      }
      else if(err.message.includes('There is no auction with this id')){
        notify('Podany przetarg nie został zarejestrowany w blockchainie', NotificationType.ERROR);
      }
    });
  };

  return {
    contract: initContract(),
    account,
    addMoney,
    registerAdvertiser,
    registerOfferent,
    createAuction,
    makeOffer
  };
};

export default useBlockchain;