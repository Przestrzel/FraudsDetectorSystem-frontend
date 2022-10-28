import { AuctionDetails, AuctionOffer } from 'types/auctions.types';
import { endpoints } from 'utils/config.utils';
import http from 'utils/http.utils';

const getAuctions = (page = 1) => {
  return http.get(`${ endpoints.auctions.index }?pageNumber=${ page }&pageSize=5`);
};

const getAuction = (id: number) => {
  return http.get<AuctionDetails>(`${ endpoints.auctions.detail }/${ id }`);
};

const createAuction = (auction, id) => {
  return http.post(endpoints.auctions.save, auction, {
    params: {
      id
    }
  });
};

const postOffer = (id: number, offer: AuctionOffer) => {
  return { id, offer };
};

export { getAuctions, getAuction, postOffer, createAuction };