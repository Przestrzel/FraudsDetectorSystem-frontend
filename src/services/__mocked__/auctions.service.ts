import { Auction, AuctionDetails, AuctionOffer, AuctionStatus } from 'types/auctions.types';
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
    offers: [ {
      id: 1,
      name: 'Moja Szkoła Kornelia Klamann',
      price: 45228.33
    },
    {
      id: 2,
      name: '7 Zmysłów Integracja Sensoryczna Marcin Bielecki',
      price: 58432.00,
    },
    {
      id: 3,
      name: 'Grupa Invest Sp. z o.o.',
      price: 71212.96
    },
    {
      id: 4,
      name: 'Moje Bambino Sp. z o.o., Sp.k.',
      price: 62728.63
    },
    {
      id: 5,
      name: 'Nowa Szkoła Sp. z o.o.',
      price: 48910.00
    } ]
  });
};

const postOffer = (id: number, offer: AuctionOffer) => {
  return Promise.resolve<AuctionOffer>(offer);
};

export { getAuctions, getAuction, postOffer };
