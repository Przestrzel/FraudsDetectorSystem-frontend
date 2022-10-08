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
    label: 'Name',
  },
  {
    name: 'city',
    type: 'text',
    label: 'City',
  },
  {
    name: 'start_date',
    type: 'date',
    label: 'Start date',
  },
  {
    name: 'end_date',
    type: 'date',
    label: 'End date',
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
    label: 'Criteria',
    options: [
      { label: 'Price', value: 'price', },
      { label: 'Quality', value: 'quality', },
    ]
  },
];

const AddAuctionForm = () => {
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      city: '',
      start_date: dayjs(new Date()).format('YYYY-MM-DD'),
      end_date: dayjs(new Date()).format('YYYY-MM-DD'),
      status: AuctionStatus.RESOLVED,
      criteria: 'price',
    } });

  const renderInput = (input) => (
    input.type === 'select' ? (
      <FormControl className={ styles[ input.name ] } key={ input.label }>
        <InputLabel id={ input.label }>{ input.label }</InputLabel>
        <Controller
          { ...register(input.name) }
          control={ control }
          name={ input.name }
          render={ ({ field }) => (
            <Select
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
          { ...register(input.name) }
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
          <Button text='Clear' onClick={ clearForm }/>
          <Button text='Submit' variant='contained' type='submit'/>
        </div>
      </form>
    </div>
  );
};

export default AddAuctionForm;