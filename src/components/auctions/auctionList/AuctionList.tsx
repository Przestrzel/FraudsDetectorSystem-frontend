import React from 'react';
import AuctionElement from './auctionElement/AuctionElement';
import auctions from './mocked_auctions';

const AuctionList = () => {
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