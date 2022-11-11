import React from 'react';
import Modal from 'components/common/modal/Modal';
import { useForm } from 'react-hook-form';
import Input from 'components/common/input/Input';

import styles from './AddOfferModal.module.scss';
import Button from 'components/common/button/Button';
import { postOffer } from 'services/auctions.service';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { NotificationType } from 'types/app.types';
import useNotification from 'hooks/useNotification';
import dayjs from 'dayjs';
import useBlockchain from 'hooks/useBlockchain';

const validationSchema = yup.object({
  date: yup.date().required(),
  price: yup.string().required()
});

const inputs = [
  {
    name: 'date',
    label: 'Data',
    type: 'date'
  },
  {
    name: 'price',
    label: 'Price',
    type: 'number',
  }
];

type Props = {
  auctionId: number;
  isOpen: boolean;
  onClose: () => void;
};

const AddOfferModal = ({ isOpen, onClose, auctionId }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const blockchainService = useBlockchain();
  const { notify } = useNotification();
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      date: dayjs(new Date()).format('YYYY-MM-DD'),
      price: ''
    }
  });

  const onSubmit = (data) => {
    blockchainService.makeOffer(auctionId, user.companyName, data.price)
      .then(() => {
        postOffer(auctionId, user.id, data).then(() => {
          notify('Dodałeś ofertę', NotificationType.INFO);
          window.location.reload();
        }).catch(() => {
          notify('Nie udało się dodać oferty', NotificationType.ERROR);
        }).finally(() => {
          onClose();
        });
      });
  };

  const clearForm = () => {
    reset();
  };

  return (
    <Modal isOpen={ isOpen } onClose={ onClose } title='Dodaj nową ofertę'>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.inputs }>
          { inputs.map((input) => (
            <Input
              key={ input.label }
              control={ control }
              label={ input.label }
              type={ input.type }
              name={ input.name }
              error={ errors[ input.name ]?.message != null }
            />
          )) }
        </div>
        <div className={ styles.buttons }>
          <Button text='Wyczyść' onClick={ clearForm }/>
          <Button text='Dodaj' variant='contained' type='submit'/>
        </div>
      </form>
    </Modal>
  );
};

export default AddOfferModal;