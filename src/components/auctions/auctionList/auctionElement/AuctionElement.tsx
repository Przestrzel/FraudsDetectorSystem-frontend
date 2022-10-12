import React, { useCallback } from 'react';
import AuctionStatus from 'components/auctions/auctionStatus/AuctionStatus';
import { useNavigate } from 'react-router-dom';
import { Auction } from 'types/auctions.types';
import { routes } from 'utils/config.utils';

import styles from './AuctionElement.module.scss';
import dayjs from 'dayjs';

type Props = {
  auction: Auction;
};

const AuctionElement = ({ auction }: Props) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`${ routes.auctions }/${ auction.id }`);
  }, [ auction ]);

  return (
    <div
      className={ styles.auction }
      onClick={ onClick }>
      <div className={ styles.auctionName }>{ auction.auctionName }</div>
      <div className={ styles.auctionDetails }>
        <div className={ styles.auctionDetailsElement }>
          <div>Start date</div>
          <div>{ dayjs(auction.startDate).format('YYYY-MM-DD') }</div>
        </div>
        <div className={ styles.auctionDetailsElement }>
          <div>End date</div>
          <div>{ dayjs(auction.endDate).format('YYYY-MM-DD') }</div>
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