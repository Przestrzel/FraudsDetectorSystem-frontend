import Web3 from 'web3';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const provider = new Web3.providers.HttpProvider('http://ganache:8545');
const web3 = new Web3(provider);

export const getWeb3 = () => {

};