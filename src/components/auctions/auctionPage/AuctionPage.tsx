import React from 'react';
import { useForm } from 'react-hook-form';
import AuctionFilters from '../auctionFilters/AuctionFilters';
import AuctionList from '../auctionList/AuctionList';

import styles from './AuctionPage.module.scss';

const AuctionPage = () => {
  const { control } = useForm();

  return (
    <div className={ styles.auctionPage }>
      <div className={ styles.auctionFilters }>
        <div>
          <div className={ styles.auctionFiltersTitle }>
            Auction filters
          </div>
          <AuctionFilters control={ control }/>
          <AuctionList />
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;