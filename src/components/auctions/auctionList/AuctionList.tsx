import Loader from 'components/common/loader/Loader';
import React from 'react';
import { Auction } from 'types/auctions.types';
import AuctionElement from './auctionElement/AuctionElement';

import styles from './AuctionList.module.scss';

type Props = {
  auctions: Auction[];
  isLoading: boolean;
};

const AuctionList = ({ auctions, isLoading }: Props) => {
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