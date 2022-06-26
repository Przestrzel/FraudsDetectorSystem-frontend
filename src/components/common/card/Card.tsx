import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

import styles from './Card.module.scss';

type Props = {
  className?: string;
  children?: ReactNode;
};

const Card = ({ className, children }: Props) => {
  return (
    <Box className={ `${ styles.card } ${ className ?? '' }` }>
      <div>{ children }</div>
    </Box>
  );
};

export default Card;