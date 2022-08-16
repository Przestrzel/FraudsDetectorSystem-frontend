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