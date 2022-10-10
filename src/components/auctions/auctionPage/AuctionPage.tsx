/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import { getAuctions } from 'services/auctions.service';
import { Auction } from 'types/auctions.types';
import AuctionFilters from '../auctionFilters/AuctionFilters';
import AuctionList from '../auctionList/AuctionList';

import styles from './AuctionPage.module.scss';

const AuctionPage = () => {
  const [ auctions, setAuctions ] = useState<Auction[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ page, setPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(2);
  const { control, register } = useForm({ defaultValues: {
    auction: '',
    city: 0,
    start_date: dayjs(new Date()).format('YYYY-MM-DD'),
    end_date: dayjs(new Date()).format('YYYY-MM-DD'),
  } });

  const getPaginatedAuctions = useCallback(() => {
    setIsLoading(true);
    getAuctions(page).then(({ data })=> {
      setAuctions(prev => [ ...prev, ...data.items ]);
      setTotalPages(data.totalPages);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [ page ]);

  const debouncedGetAuctions = useCallback(
    debounce(getPaginatedAuctions, 100), [ page ]
  );

  useEffect(() => {
    if(totalPages <= page) {
      return;
    }
    debouncedGetAuctions();
  }, [ page ]);

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