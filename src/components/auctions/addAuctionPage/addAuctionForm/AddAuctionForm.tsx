/* eslint-disable camelcase */
import React from 'react';
import { Controller } from 'react-hook-form';
import Input from 'components/common/input/Input';
import { MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';

import styles from './AddAuctionForm.module.scss';
import { useForm } from 'react-hook-form';
import { AuctionStatus } from 'types/auctions.types';
import { capitalizeFirstLetter } from 'utils/string.utils';
import Button from 'components/common/button/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { cityOptions } from 'utils/config.utils';

const validationSchema = yup.object({
  name: yup.string().email().required(),
  city: yup.string().required(),
  'start_date': yup.date().required(),
  'end_date': yup.date().required(),
  status: yup.string().required(),
  criteria: yup.string().required(),
});

const inputs = [
  {
    name: 'name',
    type: 'textarea',
    label: 'Nazwa',
  },
  {
    name: 'city',
    type: 'select',
    label: 'Miasto',
    options: cityOptions
  },
  {
    name: 'startDate',
    type: 'date',
    label: 'Data rozpoczęcia',
  },
  {
    name: 'endDate',
    type: 'date',
    label: 'Data zakończenia',
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    options: Object.values(AuctionStatus).map(status => ({
      label: capitalizeFirstLetter(status),
      value: status,
    })),
  },
  {
    name: 'criteria',
    type: 'select',
    label: 'Kryteria oceny',
    options: [
      { label: 'Cena', value: 'price', },
      { label: 'Jakość', value: 'quality', },
    ]
  },
];

const AddAuctionForm = () => {
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      city: cityOptions[ 0 ].value,
      startDate: dayjs(new Date()).format('YYYY-MM-DD'),
      endDate: dayjs(new Date()).format('YYYY-MM-DD'),
      status: AuctionStatus.RESOLVED,
      criteria: 'price',
    } });

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
              { input.options.map(option => <MenuItem
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

  const onSubmitHandler = (data) => {
    console.log(data);
  };

  const clearForm = () => {
    reset();
  };

  return (
    <div className={ styles.formLayout }>
      <form onSubmit={ handleSubmit(onSubmitHandler) }>
        {
          inputs.map((input) => renderInput(input))
        }
        <div className={ styles.buttons }>
          <Button text='Wyczyść' onClick={ clearForm }/>
          <Button text='Dodaj' variant='contained' type='submit'/>
        </div>
      </form>
    </div>
  );
};

export default AddAuctionForm;