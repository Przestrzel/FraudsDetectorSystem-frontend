import React from 'react';
import Modal from 'components/common/modal/Modal';
import { useForm } from 'react-hook-form';
import Input from 'components/common/input/Input';

import styles from './AddOfferModal.module.scss';
import Button from 'components/common/button/Button';
import { postOffer } from 'services/__mocked__/auctions.service';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

const validationSchema = yup.object({
  name: yup.string().required(),
  price: yup.string().required(),
  date: yup.date().required(),
});

const inputs = [
  {
    name: 'name',
    label: 'Name',
    type: 'text'
  },
  {
    name: 'price',
    label: 'Price',
    type: 'number',
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
  }
];

type Props = {
  auctionId: number;
  isOpen: boolean;
  onClose: () => void;
};

const AddOfferModal = ({ isOpen, onClose, auctionId }: Props) => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      price: '',
      date: dayjs().format('YYYY-MM-DD'),
    }
  });

  const onSubmit = (data) => {
    postOffer(auctionId, data).then((offer) => {
      console.log(offer);
    });
  };

  const clearForm = () => {
    reset();
  };

  return (
    <Modal isOpen={ isOpen } onClose={ onClose } title='Add new offer'>
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
          <Button text='Clear' onClick={ clearForm }/>
          <Button text='Add' variant='contained' type='submit'/>
        </div>
      </form>
    </Modal>
  );
};

export default AddOfferModal;