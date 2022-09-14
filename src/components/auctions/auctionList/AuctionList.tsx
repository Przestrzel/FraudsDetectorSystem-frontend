import Loader from 'components/common/loader/Loader';
import React, { useEffect, useState } from 'react';
import { getAuctions } from 'services/__mocked__/auctions.service';
import { Auction } from 'types/auctions.types';
import AuctionElement from './auctionElement/AuctionElement';

import styles from './AuctionList.module.scss';

const AuctionList = () => {
  const [ auctions, setAuctions ] = useState<Auction[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAuctions().then(data => {
      setAuctions(data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={ styles.auctionList }>
      { isLoading ?
        <Loader /> :
        auctions.map((auction) => (
          <AuctionElement key={ auction.id } auction={ auction } />
        ))
      }
    </div>
  );
};

export default AuctionList;