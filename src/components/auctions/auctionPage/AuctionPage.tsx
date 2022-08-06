import React from 'react';
import { useForm } from 'react-hook-form';
import AuctionFilters from '../auctionFilters/AuctionFilters';

import styles from './AuctionPage.module.scss';

const AuctionPage = () => {
  const { control } = useForm();

  return (
    <div className={ styles.auctionPage }>
      <div className={ styles.auctionFilters }>
        Auction filters
      </div>
      <AuctionFilters control={ control }/>
    </div>
  );
};

export default AuctionPage;