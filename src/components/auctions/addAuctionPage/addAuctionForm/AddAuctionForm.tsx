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
import Button from 'components/common/button/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { cloneDeep } from 'lodash';
import { createAuction } from 'services/auctions.service';
import { routes } from 'utils/config.utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { NotificationType } from 'types/app.types';
import useNotification from 'hooks/useNotification';
import useBlockchain from 'hooks/useBlockchain';

const validationSchema = yup.object({
  auctionName: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  criteria: yup.string().required(),
});

const inputs = [
  {
    name: 'auctionName',
    type: 'textarea',
    label: 'Nazwa',
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
    name: 'criteria',
    type: 'select',
    label: 'Kryteria oceny',
    options: [
      { label: 'Cena', value: 'price', },
      { label: 'Jakość', value: 'quality', },
    ]
  },
  {
    name: 'cpv',
    type: 'text',
    label: 'CPV',
  }
];

const AddAuctionForm = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const user = useSelector((state: RootState) => state.auth.user);
  const blockchainService = useBlockchain();
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      auctionName: '',
      startDate: dayjs(new Date()).format('YYYY-MM-DD'),
      endDate: dayjs(new Date()).format('YYYY-MM-DD'),
      criteria: 'price',
      cpv: '',
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
    const mappedData = cloneDeep(data);
    mappedData.cpv = mappedData.cpv.split(',').map(cpv => cpv.trim());
    const isPriceCriterium = mappedData.criteria === 'price';
    delete mappedData.criteria;
    mappedData.isPriceCriterium = isPriceCriterium;
    createAuction(mappedData, user.id)
      .then((res) => {
        navigate(routes.home);
        notify('Przetarg został dodany!', NotificationType.INFO);
        blockchainService.createAuction(
          res.data.id,
          mappedData.auctionName,
          mappedData.startDate,
          mappedData.endDate
        );
      });
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