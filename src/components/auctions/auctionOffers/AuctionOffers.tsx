import React from 'react';
import { AuctionOffer } from 'types/auctions.types';
import styles from './AuctionOffers.module.scss';

type Props = {
  offers: AuctionOffer[];
};

const AuctionOffers = ({ offers }: Props) => {
  return (
    <div className={ styles.offersGrid }>
      {
        offers?.map((offer) => (
          <div className={ styles.offer } key={ offer.id }>
            <div className={ styles.offerRow }>
              <div className={ styles.offerLabel }>Nazwa:</div>
              <div>{ offer?.bidderName }</div>
            </div>
            <div className={ styles.offerRow }>
              <div className={ styles.offerLabel }>Cena:</div>
              <div>{ offer?.price }</div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default AuctionOffers;