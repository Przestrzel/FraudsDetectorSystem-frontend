export type Auction = {
  id: number;
  name: string;
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
  criteria: AuctionCriteria;
  offers: AuctionOffer[];
  redFlag: boolean;
};

export type AuctionOffer = {
  id: number;
  companyName: string;
  price: number;
};
