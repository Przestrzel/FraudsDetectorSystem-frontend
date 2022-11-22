/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Pagination } from '@mui/material';
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
  const [ totalPages, setTotalPages ] = useState(0);
  const { handleSubmit, control, register, watch } = useForm({ defaultValues: {
    searchPhrase: '',
    city: '',
    startDate: '',
    endDate: '',
  } });
  const searchPhrase = watch('searchPhrase');
  const city = watch('city');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const getFilters = () => {
    const filters = {};

    filters[ 'searchPhrase' ] = searchPhrase;
    filters[ 'city' ] = city;
    filters[ 'startDate' ] = startDate ? dayjs(startDate).format('YYYY-MM-DD') : '';
    filters[ 'endDate' ] = endDate ? dayjs(endDate).format('YYYY-MM-DD') : '';

    return filters;
  };

  useEffect(() => {
    setPage(1);
  }, [ searchPhrase, city, startDate, endDate ]);

  useEffect(() => {
    setIsLoading(true);
    const filters = getFilters();
    getAuctions(page, filters).then(({ data })=> {
      setAuctions(data.items);
      setTotalPages(data.totalPages);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [ page, searchPhrase, city, startDate, endDate ]);

  const onFilter= (data) => {
    console.log(data);
  };

  return (
    <div className={ styles.auctionPage }>
      <div className={ styles.auctionFilters }>
        <div>
          <div className={ styles.auctionFiltersTitle }>
            Filtry
          </div>
          <AuctionFilters
            control={ control }
            register={ register }
            onSubmit={ handleSubmit(onFilter) }/>
          <AuctionList auctions={ auctions } isLoading={ isLoading } />
          <div className={ styles.pagination }>
            <Pagination
              count={ totalPages }
              page={ page }
              color='primary'
              onChange={ (_, newPage) => setPage(newPage) } />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;