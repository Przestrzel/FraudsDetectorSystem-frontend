export type Auction = {
  id: number;
  auctionName: string;
  startDate: string;
  endDate: string;
  status: AuctionStatus;
};

export enum AuctionStatus {
  RESOLVED = 'Rozstrzygnięte',
  CLOSED = 'Zamknięte',
  CANCELED = 'Anulowane',
}

export type AuctionCriteria = 'price' | 'quality';

export type AuctionDetails = Auction & {
  criterium: AuctionCriteria;
  offerLosers: AuctionOffer[];
  offerWinners: AuctionOffer[];
  redFlags: string[];
};

export type AuctionOffer = {
  id: number;
  bidderName: string;
  price: number;
};
