import React from 'react';
import AddAuctionForm from './addAuctionForm/AddAuctionForm';

import styles from './AddAuctionPage.module.scss';

const AddAuctionPage = () => {
  return (
    <div className={ styles.layout }>
      <AddAuctionForm />
    </div>
  );
};

export default AddAuctionPage;