/* eslint-disable camelcase */
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import AuctionFilters from '../auctionFilters/AuctionFilters';
import AuctionList from '../auctionList/AuctionList';

import styles from './AuctionPage.module.scss';

const AuctionPage = () => {
  const { control, register } = useForm({ defaultValues: {
    auction: '',
    city: 0,
    start_date: dayjs(new Date()).format('YYYY-MM-DD'),
    end_date: dayjs(new Date()).format('YYYY-MM-DD'),
  } });

  return (
    <div className={ styles.auctionPage }>
      <div className={ styles.auctionFilters }>
        <div>
          <div className={ styles.auctionFiltersTitle }>
            Auction filters
          </div>
          <AuctionFilters control={ control } register={ register }/>
          <AuctionList />
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;