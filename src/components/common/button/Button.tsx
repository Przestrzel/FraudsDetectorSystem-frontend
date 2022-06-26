import React from 'react';
import { Button as MUIButton } from '@mui/material';

type Props = {
  text: string;
  variant?: 'contained' | 'text' | 'outlined';
  size?: 'small' | 'medium';
};

const Button = ({ text, variant='text', size='medium' }: Props) => {
  return (
    <MUIButton variant={ variant } size={ size }>
      { text }
    </MUIButton>
  );
};

export default Button;