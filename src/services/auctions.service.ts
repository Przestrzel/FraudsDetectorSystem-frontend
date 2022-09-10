import { AuctionOffer } from 'types/auctions.types';

const getAuctions = () => {
  return [];
};

const getAuction = (id: string) => {
  return { id };
};

const postOffer = (id: number, offer: AuctionOffer) => {
  return { id, offer };
};

export { getAuctions, getAuction, postOffer };