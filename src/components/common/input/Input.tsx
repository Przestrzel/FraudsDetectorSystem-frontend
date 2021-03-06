import React, { HTMLInputTypeAttribute, useCallback } from 'react';
import { Controller, Control } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import styles from './Input.module.scss';

type Props = {
  label: string;
  control: Control;
  name: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  defaultValue?: string;
};

const Input = ({ label, type, className, control, name, defaultValue }: Props) => {
  const getInput = useCallback(({ field }) => {
    return <TextField
      className={ `${ styles.input } ${ className ?? '' }` }
      label={ label }
      size='medium'
      type={ type ?? 'text' }
      value=''
      { ...field } />;
  }, []);

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