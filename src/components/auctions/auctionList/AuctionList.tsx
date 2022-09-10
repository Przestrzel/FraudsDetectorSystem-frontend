import React, { useEffect, useState } from 'react';
import { getAuctions } from 'services/__mocked__/auctions.service';
import { Auction } from 'types/auctions.types';
import AuctionElement from './auctionElement/AuctionElement';

const AuctionList = () => {
  const [ auctions, setAuctions ] = useState<Auction[]>([]);

  useEffect(() => {
    getAuctions().then(data => {
      setAuctions(data);
    });
  }, []);

  return (
    <div>
      { auctions.map((auction) => (
        <AuctionElement key={ auction.id } auction={ auction } />
      ))
      }
    </div>
  );
};

export default AuctionList;