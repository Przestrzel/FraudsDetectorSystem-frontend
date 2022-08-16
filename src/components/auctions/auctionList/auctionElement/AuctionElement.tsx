import React from 'react';
import { Auction } from 'types/auctions.types';

import styles from './AuctionElement.module.scss';

type Props = {
  auction: Auction;
};

const AuctionElement = ({ auction }: Props) => {
  return (
    <div className={ styles.auction }>
      <div className={ styles.auctionName }>{ auction.name }</div>
      <div className={ styles.auctionDetails }>
        <div className={ styles.auctionDetailsElement }>
          <div>Start date</div>
          <div>{ auction.startDate }</div>
        </div>
        <div className={ styles.auctionDetailsElement }>
          <div>End date</div>
          <div>{ auction.endDate }</div>
        </div>
        <div className={ styles.auctionDetailsElement }>
          <div>Status</div>
          <div>{ auction.status }</div>
        </div>
      </div>
    </div>
  );
};

export default AuctionElement;