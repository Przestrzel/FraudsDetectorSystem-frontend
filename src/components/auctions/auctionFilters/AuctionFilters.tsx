import React from 'react';
import { MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import styles from './AuctionFilters.module.scss';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
};

const cityOptions = [
  { label: 'Łomża', value: 0 },
  { label: 'Mława', value: 1 },
  { label: 'Lubawa', value: 2 },
  { label: 'Grudziądz', value: 3 }
];

const AuctionFilters = ({ control }: Props) => {
  return (
    <div className={ styles.auctionFilters }>
      <FormControl sx={ { m: 1, minWidth: 360 } } >
        <Controller
          control={ control }
          name='auction'
          render={ ({ field }) => (
            <TextField
              size='small'
              label='Auction name'
              { ...field }
            />
          ) }/>
      </FormControl>
      <FormControl sx={ { m: 1, minWidth: 120 } } size='small' >
        <InputLabel id='city-label'>City</InputLabel>
        <Controller
          control={ control }
          name='city'
          render={ ({ field }) => (
            <Select
              labelId='city-label'
              label='City'
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
          name='start-date'
          render={ ({ field }) => (
            <TextField
              size='small'
              className={ field.value ? styles.active : '' }
              label='Start date'
              type='date'
              { ...field }
            />
          ) }/>
      </FormControl>
      <FormControl sx={ { m: 1, minWidth: 90 } } >
        <Controller
          control={ control }
          name='end-date'
          render={ ({ field }) => (
            <TextField
              size='small'
              className={ field.value ? styles.active : '' }
              label='End date'
              type='date'
              { ...field }
            />
          ) }/>
      </FormControl>
    </div>
  );
};

export default AuctionFilters;