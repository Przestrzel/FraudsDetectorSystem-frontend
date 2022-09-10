import AuctionStatus from 'components/auctions/auctionStatus/AuctionStatus';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auction } from 'types/auctions.types';
import { routes } from 'utils/config.utils';

import styles from './AuctionElement.module.scss';

type Props = {
  auction: Auction;
};

const AuctionElement = ({ auction }: Props) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(`${ routes.auctions }/${ auction.id }`);
  }, [ auction ]);
  console.log(auction);

  return (
    <div className={ styles.auction } onClick={ onClick }>
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
          <AuctionStatus status={ auction.status } />
        </div>
      </div>
    </div>
  );
};

export default AuctionElement;