import React from 'react';
import { AuctionStatus as AuctionStatusType } from 'types/auctions.types';

import styles from './AuctionStatus.module.scss';

type Props = {
  status: AuctionStatusType;
};

const AuctionStatus = ({ status }: Props) => {
  return (
    <div className={ styles[ status ] }>{ status }</div>
  );
};

export default AuctionStatus;