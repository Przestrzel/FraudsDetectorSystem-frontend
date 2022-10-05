import React from 'react';
import { Button as MUIButton } from '@mui/material';

type Props = {
  text: string;
  variant?: 'contained' | 'text' | 'outlined';
  size?: 'small' | 'medium';
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
};

const Button = ({ text,
  onClick,
  className='',
  variant='text',
  size='medium',
  type='button' }: Props) => {
  return (
    <MUIButton
      variant={ variant }
      size={ size }
      type={ type }
      className={ className }
      onClick={ onClick }>
      { text }
    </MUIButton>
  );
};

export default Button;