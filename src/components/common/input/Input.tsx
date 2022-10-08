/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HTMLInputTypeAttribute, useCallback } from 'react';
import { Controller, Control } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import styles from './Input.module.scss';

type Props = {
  label: string;
  control: Control<any, any>;
  name: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  defaultValue?: string;
  error?: boolean;
};

const Input = ({ label, type, className, control, name, defaultValue, error=false }: Props) => {
  const getInput = useCallback(({ field }) => {
    return <TextField
      className={ `${ styles.input } ${ className ?? '' }` }
      label={ label }
      size='medium'
      type={ type ?? 'text' }
      value=''
      error={ error }
      { ...field } />;
  }, [ error ]);

  return (
    <Controller
      name={ name }
      control={ control }
      render={ getInput }
      defaultValue={ defaultValue ?? '' }
    />
  );
};

export default Input;