import React, { useEffect, useState } from 'react';
import Loader from 'components/common/loader/Loader';
import { useParams } from 'react-router-dom';
import { getAuction } from 'services/__mocked__/auctions.service';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AuctionDetails } from 'types/auctions.types';
import { ReactComponent as Flag } from 'assets/icons/flag.svg';

import styles from './AuctionDetailsPage.module.scss';
import { Tooltip } from '@mui/material';
import AuctionOffers from '../auctionOffers/AuctionOffers';
import AddOfferModal from '../addOfferModal/AddOfferModal';
import AuctionStatus from '../auctionStatus/AuctionStatus';

const AuctionDetailsPage = () => {
  const [ auction, setAuction ] = useState<AuctionDetails>(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getAuction(id).then(data => {
      setAuction(data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [ id ]);

  return (
    <div className={ styles.auctionDetailsPage }>
      {
        isLoading ? <Loader /> : auction &&
          <div className={ styles.auction }>
            <div className={ styles.flagBox }>
              <Tooltip
                placement='top'
                title={ `This auction is ${ auction.redFlag ? 'suspicious' : 'trusted' }` }
              >
                <Flag className={ `${ styles.flag } ${ auction.redFlag ? styles.flagRed: '' }` } />
              </Tooltip>
            </div>
            <div className={ styles.auctionInfo }>
              <div>
                <div className={ styles.auctionLabel }>Title</div>
                <div className={ styles.auctionTitle }>{ auction.name }</div>
              </div>
              <div>
                <div className={ styles.auctionInfoDetail }>
                  <div className={ styles.auctionLabel }>Start date:</div>
                  <div>{ auction.startDate }</div>
                </div>
                <div className={ styles.auctionInfoDetail }>
                  <div className={ styles.auctionLabel }>End date:</div>
                  <div>{ auction.endDate }</div>
                </div>
                <div className={ styles.auctionInfoDetail }>
                  <div className={ styles.auctionLabel }>Status:</div>
                  <AuctionStatus status={ auction.status } />
                </div>
                <div className={ styles.auctionInfoDetail }>
                  <div className={ styles.auctionLabel }>Criteria:</div>
                  <div>{ auction.criteria }</div>
                </div>
              </div>
            </div>
            <div className={ styles.offers }>
              <div className={ styles.auctionAddOffer }>
                <div className={ styles.auctionLabel }>Offers</div>
                <button
                  onClick={ () => setIsModalOpen(true) }
                  className={ styles.addOffer }>
                  <AddCircleIcon />Add offer
                </button>
              </div>
              <AuctionOffers offers={ auction.offers } />
            </div>
          </div>
      }
      <AddOfferModal
        auctionId={ auction?.id }
        isOpen={ isModalOpen }
        onClose={ () => setIsModalOpen(false) }
      />
    </div>
  );
};

export default AuctionDetailsPage;