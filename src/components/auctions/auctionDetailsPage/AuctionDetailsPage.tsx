import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuction } from 'services/__mocked__/auctions.service';

const AuctionDetailsPage = () => {
  const [ auction, setAuction ] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getAuction(id).then(data => {
      setAuction(data);
    });
  }, [ id ]);

  return (
    <div>
      { auction && auction.id }
    </div>
  );
};

export default AuctionDetailsPage;