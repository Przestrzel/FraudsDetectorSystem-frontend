import React from 'react';
import { AuctionOffer } from 'types/auctions.types';
import styles from './AuctionOffers.module.scss';

type Props = {
  offers: AuctionOffer[];
};

const AuctionOffers = ({ offers }: Props) => {
  return (
    <div className={ styles.offersGrid }>
      { offers?.length ? offers.map((offer) => (
        <div className={ styles.offer } key={ offer.id }>
          <div className={ styles.offerRow }>
            <div className={ styles.offerLabel }>Name:</div>
            <div>{ offer.name }</div>
          </div>
          <div className={ styles.offerRow }>
            <div className={ styles.offerLabel }>Price:</div>
            <div>{ offer.price } PLN</div>
          </div>
        </div>
      )) : 'No auctions found' }
    </div>
  );
};

export default AuctionOffers;