import React, { HTMLInputTypeAttribute } from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  label: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
};

const Input = ({ label, type, className }: Props) => {
  return (
    <TextField
      className={ className ?? '' }
      label={ label }
      size='medium'
      type={ type ?? 'text' } />
  );
};

export default Input;