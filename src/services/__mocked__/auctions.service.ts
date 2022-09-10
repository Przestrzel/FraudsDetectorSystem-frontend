import { Auction, AuctionDetails, AuctionStatus } from 'types/auctions.types';
import auctions from './data/auctions';

const getAuctions = () => {
  return Promise.resolve<Auction[]>(auctions);
};

const getAuction = (id: string) => {
  return Promise.resolve<AuctionDetails>({
    id: +id,
    name: `Opracowanie dokumentu pn.: „Miejski Plan Adaptacji do zmian klimatu” dla miasta Łomża
     do 2030 (dalej MPA) realizowanego w ramach projektu pn. "Łomża - opracowanie dokumentacji
      w ramach wsparcia rozwoju miast POPT 2014-2020" w ramach inicjatywy „Wsparcie Rozwoju Miast”
       finansowanego ze środków Programu Operacyjnego Pomoc Techniczna 2014-2020`,
    startDate: '2022-05-19',
    endDate: '2022-05-27',
    status: 'Rozstrzygnięte' as AuctionStatus,
    redFlag: true,
    criteria: 'price',
    offers: []
  });
};

export { getAuctions, getAuction };
