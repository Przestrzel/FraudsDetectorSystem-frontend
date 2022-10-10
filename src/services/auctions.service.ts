import { AuctionOffer } from 'types/auctions.types';
import { endpoints } from 'utils/config.utils';
import http from 'utils/http.utils';

const getAuctions = (page = 1) => {
  return http.get(`${ endpoints.auctions.index }?pageNumber=${ page }&pageSize=5`);
};

const getAuction = (id: string) => {
  return { id };
};

const postOffer = (id: number, offer: AuctionOffer) => {
  return { id, offer };
};

export { getAuctions, getAuction, postOffer };