import React, { ReactElement } from 'react';
import MuiModal from '@mui/material/Modal';

import styles from './Modal.module.scss';

type Props = {
  children: ReactElement;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: Props) => {
  return (
    <MuiModal open={ isOpen }
      onClose={ onClose }
      keepMounted={ true }

    >
      <div className={ styles.centered }>
        { children }
      </div>
    </MuiModal>
  );
};

export default Modal;