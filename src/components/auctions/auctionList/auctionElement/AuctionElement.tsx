import AuctionStatus from 'components/auctions/auctionStatus/AuctionStatus';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Auction } from 'types/auctions.types';
import { routes } from 'utils/config.utils';
import { RootState } from 'store/store';

import styles from './AuctionElement.module.scss';
import dayjs from 'dayjs';

type Props = {
  auction: Auction;
};

const AuctionElement = ({ auction }: Props) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const onClick = useCallback(() => {
    if(!user && auction?.id) {
      return;
    }
    navigate(`${ routes.auctions }/${ auction.id }`);
  }, [ auction ]);

  return (
    <div
      className={ styles.auction }
      style={ { cursor: `${ user ? 'pointer' : 'default' }` } }
      onClick={ onClick }>
      <div className={ styles.auctionName }>{ auction.name }</div>
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