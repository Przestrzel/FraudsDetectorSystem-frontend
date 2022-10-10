/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { getAuctions } from 'services/auctions.service';
import { Auction } from 'types/auctions.types';
import AuctionFilters from '../auctionFilters/AuctionFilters';
import AuctionList from '../auctionList/AuctionList';

import styles from './AuctionPage.module.scss';
import { Pagination } from '@mui/material';

const AuctionPage = () => {
  const [ auctions, setAuctions ] = useState<Auction[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ page, setPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(0);
  const { control, register } = useForm({ defaultValues: {
    auction: '',
    city: 0,
    start_date: dayjs(new Date()).format('YYYY-MM-DD'),
    end_date: dayjs(new Date()).format('YYYY-MM-DD'),
  } });

  useEffect(() => {
    setIsLoading(true);
    getAuctions(page).then(({ data })=> {
      setAuctions(data.items);
      setTotalPages(data.totalPages);
    }).finally(() => {
      setIsLoading(false);
    });
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
          <div className={ styles.pagination }>
            <Pagination
              count={ totalPages }
              page={ page }
              onChange={ (event, newPage) => setPage(newPage) } />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;