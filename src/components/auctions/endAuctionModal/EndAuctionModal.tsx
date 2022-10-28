import React from 'react';
import Modal from 'components/common/modal/Modal';
import { Controller, useForm } from 'react-hook-form';
import { AuctionOffer } from 'types/auctions.types';
import styles from '../addOfferModal/AddOfferModal.module.scss';
import Button from 'components/common/button/Button';
import Input from 'components/common/input/Input';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const inputs = (offers: AuctionOffer[]) => {
  return [
    {
      name: 'description',
      label: 'Wyjaśnienie',
      type: 'text'
    },
    {
      name: 'winner',
      label: 'Zwycięzca',
      type: 'select',
      options: offers?.map((offer) => ({
        value: offer.id,
        label: offer.name,
      })),
    }
  ];
};

type Props = {
  offers: AuctionOffer[];
  isOpen: boolean;
  onClose: () => void;
};

const EndAuctionModal = ({ isOpen, onClose, offers }: Props) => {
  const { handleSubmit, control, reset, formState: { errors }, register } = useForm({
    defaultValues: {
      description: '',
      winner: 0,
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const clearForm = () => {
    reset();
  };

  const renderInput = (input) => (
    input.type === 'select' ? (
      <FormControl className={ styles[ input.name ] } key={ input.label }>
        <InputLabel id={ input.label }>{ input.label }</InputLabel>
        <Controller
          control={ control }
          name={ input.name }
          render={ ({ field }) => (
            <Select
              { ...register(input.name) }
              labelId={ input.label }
              label={ input.label }
              { ...field }
            >
              { input?.options?.map(option => <MenuItem
                key={ option.value }
                value={ option.value }>
                { option.label }
              </MenuItem>) }
            </Select>
          ) }/>
      </FormControl>
    ) :
      (
        <Input
          key={ input.label }
          control={ control }
          label={ input.label }
          type={ input.type }
          name={ input.name }
          error={ errors[ input.name ]?.message != null }
          className={ `${ styles.input } ${ styles[ input.name ] }` }
        />
      )
  );

  return (
    <Modal isOpen={ isOpen } onClose={ onClose } title='Zakończ przetarg'>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.inputs }>
          { inputs(offers).map((input) => renderInput(input)) }
        </div>
        <div className={ styles.buttons }>
          <Button text='Wyczyść' onClick={ clearForm }/>
          <Button text='Zakończ' variant='contained' type='submit'/>
        </div>
      </form>
    </Modal>
  );
};

export default EndAuctionModal;