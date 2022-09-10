import React, { useEffect, useState } from 'react';
import Loader from 'components/common/loader/Loader';
import { useParams } from 'react-router-dom';
import { getAuction } from 'services/__mocked__/auctions.service';

const AuctionDetailsPage = () => {
  const [ auction, setAuction ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getAuction(id).then(data => {
      setAuction(data);
    }).finally(() => {
      setIsLoading(true);
    });
  }, [ id ]);

  return (
    <div>
      { isLoading ? <Loader /> : auction && <div>{ auction.title }</div> }
    </div>
  );
};

export default AuctionDetailsPage;