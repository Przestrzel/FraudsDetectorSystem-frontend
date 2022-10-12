import { AuctionOffer } from 'types/auctions.types';

const postOffer = (id: number, offer: AuctionOffer) => {
  return Promise.resolve<AuctionOffer>(offer);
};

export { postOffer };
