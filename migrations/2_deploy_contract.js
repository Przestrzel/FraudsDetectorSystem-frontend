var Auction = artifacts.require('./Auctions.sol');

module.exports = function(deployer) {
  deployer.deploy(Auction);
};
