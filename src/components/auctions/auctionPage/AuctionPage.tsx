/* eslint-disable camelcase */
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAuctions } from 'services/auctions.service';
import { Auction } from 'types/auctions.types';
import AuctionFilters from '../auctionFilters/AuctionFilters';
import AuctionList from '../auctionList/AuctionList';

import styles from './AuctionPage.module.scss';

const AuctionPage = () => {
  const [ auctions, setAuctions ] = useState<Auction[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const { control, register } = useForm({ defaultValues: {
    auction: '',
    city: 0,
    start_date: dayjs(new Date()).format('YYYY-MM-DD'),
    end_date: dayjs(new Date()).format('YYYY-MM-DD'),
  } });

  const getPaginatedAuctions = useCallback(() => {
    getAuctions().then(data => {
      console.log(data);
      setAuctions([]);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const debouncedGetAuctions = useCallback(debounce(getPaginatedAuctions, 500), []);

  useEffect(() => {
    setIsLoading(true);
    debouncedGetAuctions();
  }, []);

  return (
    <div className={ styles.auctionPage }>
      <div className={ styles.auctionFilters }>
        <div>
          <div className={ styles.auctionFiltersTitle }>
            Auction filters
          </div>
          <AuctionFilters control={ control } register={ register }/>
          <AuctionList auctions={ auctions } isLoading={ isLoading } />
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;