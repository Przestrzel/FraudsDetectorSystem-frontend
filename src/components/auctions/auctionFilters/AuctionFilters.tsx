/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Control, Controller, UseFormRegister } from 'react-hook-form';

import styles from './AuctionFilters.module.scss';
import { cityOptions } from 'utils/config.utils';

type Props = {
  control: Control<any, any>;
  register: UseFormRegister<any>;
  onSubmit: (data) => void;
};

const AuctionFilters = ({ control, register, onSubmit }: Props) => {
  return (
    <div className={ styles.auctionFilters }>
      <form className={ styles.form } onSubmit={ onSubmit }>
        <FormControl sx={ { m: 1, minWidth: 360 } } >
          <Controller
            control={ control }
            name='searchPhrase'
            render={ ({ field }) => (
              <TextField
                { ...register('auction') }
                size='small'
                label='Nazwa'
                { ...field }
              />
            ) }/>
        </FormControl>
        <FormControl sx={ { m: 1, minWidth: 120 } } size='small' >
          <InputLabel id='city-label'>Miasto</InputLabel>
          <Controller
            control={ control }
            name='city'
            render={ ({ field }) => (
              <Select
                { ...register('city') }
                labelId='city-label'
                label='Miasto'
                autoWidth={ true }
                { ...field }
              >
                { cityOptions.map(option => <MenuItem
                  key={ option.value }
                  value={ option.value }>
                  { option.label }
                </MenuItem>) }
              </Select>
            ) }/>
        </FormControl>
        <FormControl sx={ { m: 1, minWidth: 90 } } >
          <Controller
            control={ control }
            name='startDate'
            render={ ({ field }) => (
              <TextField
                { ...register('startDate') }
                size='small'
                className={ field.value ? styles.active : '' }
                label='Data rozpoczęcia'
                type='date'
                { ...field }
              />
            ) }/>
        </FormControl>
        <FormControl sx={ { m: 1, minWidth: 90 } } >
          <Controller
            control={ control }
            name='endDate'
            render={ ({ field }) => (
              <TextField
                { ...register('endDate') }
                size='small'
                className={ field.value ? styles.active : '' }
                label='Data zakończenia'
                type='date'
                { ...field }
              />
            ) }/>
        </FormControl>
      </form>
    </div>
  );
};

export default AuctionFilters;