import React, { useEffect, useState } from 'react';
import Loader from 'components/common/loader/Loader';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { getAuction } from 'services/auctions.service';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AuctionDetails } from 'types/auctions.types';
import { ReactComponent as Flag } from 'assets/icons/flag.svg';

import styles from './AuctionDetailsPage.module.scss';
import { Tooltip } from '@mui/material';
import AuctionOffers from '../auctionOffers/AuctionOffers';
import AddOfferModal from '../addOfferModal/AddOfferModal';
import AuctionStatus from '../auctionStatus/AuctionStatus';
import EndAuctionModal from '../endAuctionModal/EndAuctionModal';

const AuctionDetailsPage = () => {
  const [ auction, setAuction ] = useState<AuctionDetails>(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isEndAuctionModalOpen, setIsEndAuctionModalOpen ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getAuction(+id).then(data => {
      setAuction(data?.data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [ id ]);

  const getPriceCriterium = (criteria: string) => {
    return criteria === 'PRICE' ? 'Cena' : 'Jakość';
  };

  return (
    <div className={ styles.auctionDetailsPage }>
      {
        isLoading ? <Loader /> : auction &&
          <div className={ styles.auction }>
            <div className={ styles.flagBox }>
              <Tooltip
                placement='top'
                title={ `Ten przetarg jest ${ auction.redFlag ? 'podejrzany' : 'zaufany' }` }
              >
                <Flag className={ `${ styles.flag }
                  ${ auction.redFlag ? styles.flagRed: styles.flagGreen }` } />
              </Tooltip>
            </div>
            <div className={ styles.auctionInfo }>
              <div>
                <div className={ styles.auctionLabel }>Nazwa</div>
                <div className={ styles.auctionTitle }>{ auction.auctionName }</div>
              </div>
              <div>
                <div className={ styles.auctionInfoDetail }>
                  <div className={ styles.auctionLabel }>Data rozpoczęcia:</div>
                  <div>{ dayjs(auction.startDate).format('YYYY-MM-DD') }</div>
                </div>
                <div className={ styles.auctionInfoDetail }>
                  <div className={ styles.auctionLabel }>Data zakończenia:</div>
                  <div>{ dayjs(auction.endDate).format('YYYY-MM-DD') }</div>
                </div>
                <div className={ styles.auctionInfoDetail }>
                  <div className={ styles.auctionLabel }>Status:</div>
                  <AuctionStatus status={ auction.status } />
                </div>
                <div className={ styles.auctionInfoDetail }>
                  <div className={ styles.auctionLabel }>Kryteria:</div>
                  <div>{ getPriceCriterium(auction.criterium) }</div>
                </div>
                <div className={ styles.auctionInfoDetail }>
                  {
                    !auction.offers?.length &&
                    <button
                      onClick={ () => setIsEndAuctionModalOpen(true) }
                      className={ styles.endAuction }>
                      Zakończ przetarg
                    </button>
                  }
                </div>
              </div>
            </div>
            <div className={ styles.offers }>
              <div className={ styles.auctionAddOffer }>
                <div className={ styles.auctionLabel }>Oferty</div>
                {
                  auction.offers?.length &&
                  <button
                    onClick={ () => setIsModalOpen(true) }
                    className={ styles.addOffer }>
                    <AddCircleIcon /> Dodaj ofertę
                  </button>
                }
              </div>
              <AuctionOffers offers={ auction.offers } />
              {
                !auction.offers?.length &&
                <div className={ styles.offerBig }>
                  <button
                    onClick={ () => setIsModalOpen(true) }
                    className={ `${ styles.addOffer } ${ styles.addOfferBig }` }>
                    <AddCircleIcon /> Dodaj pierwszą ofertę
                  </button>
                </div>
              }
            </div>
          </div>
      }
      <AddOfferModal
        auctionId={ auction?.id }
        isOpen={ isModalOpen }
        onClose={ () => setIsModalOpen(false) }
      />
      <EndAuctionModal
        offers={ auction?.offers }
        isOpen={ isEndAuctionModalOpen }
        onClose={ () => setIsEndAuctionModalOpen(false) }
      />
    </div>
  );
};

export default AuctionDetailsPage;