import { AuctionDetails, AuctionOffer } from 'types/auctions.types';
import { endpoints } from 'utils/config.utils';
import http from 'utils/http.utils';

const getAuctions = (page = 1, filters) => {
  return http.get(`${ endpoints.auctions.index }?pageNumber=${ page }&pageSize=6`, {
    params: {
      ...filters
    }
  });
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

const postOffer = (auctionId: number, userId: number, offer: AuctionOffer) => {
  return http.post(`${ endpoints.auctions.detail }/${ auctionId }/offers`, offer, {
    params: {
      id: userId
    }
  });
};

const endAuction = (auctionId: number, userId: number, data) => {
  return http.post(`${ endpoints.auctions.detail }/${ auctionId }/endAuction`, data, {
    params: {
      id: userId
    }
  });
};

const isAuctionCreator = (auctionId: number, userId: number) => {
  return http.get(`${ endpoints.auctions.detail }/${ auctionId }/isCreator`, {
    params: {
      id: userId
    }
  });
};

export { getAuctions, getAuction, postOffer, createAuction, endAuction, isAuctionCreator };