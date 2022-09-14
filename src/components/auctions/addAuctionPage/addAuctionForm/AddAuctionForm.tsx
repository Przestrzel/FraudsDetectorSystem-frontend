/* eslint-disable camelcase */
import React from 'react';
import { Controller } from 'react-hook-form';
import Input from 'components/common/input/Input';
import { MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import styles from './AddAuctionForm.module.scss';
import { useForm } from 'react-hook-form';
import { AuctionStatus } from 'types/auctions.types';
import { capitalizeFirstLetter } from 'utils/string.utils';
import Button from 'components/common/button/Button';

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
    options: Object.keys(AuctionStatus).map(status => ({
      label: capitalizeFirstLetter(AuctionStatus[ status ]),
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
  const { control, handleSubmit, reset } = useForm({ defaultValues: {
    name: '',
    city: '',
    start_date: new Date(),
    end_date: new Date(),
    status: AuctionStatus.RESOLVED,
    criteria: 'price',
  } });

  const renderInput = (input) => (
    input.type === 'select' ? (
      <FormControl className={ styles[ input.name ] } key={ input.label } >
        <InputLabel id={ input.label }>{ input.label }</InputLabel>
        <Controller
          control={ control }
          name={ input.label }
          render={ ({ field }) => (
            <Select
              labelId={ input.label }
              label={ input.label }
              autoWidth={ true }
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