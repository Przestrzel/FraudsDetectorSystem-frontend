import React, { ReactElement } from 'react';
import MuiModal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import styles from './Modal.module.scss';

type Props = {
  children: ReactElement;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const Modal = ({ children, isOpen, onClose, title }: Props) => {
  return (
    <MuiModal
      open={ isOpen }
      onClose={ onClose }
    >
      <div className={ styles.centered }>
        <div className={ styles.box }>
          <div className={ styles.title }>
            <div>{ title }</div>
            <CloseIcon onClick={ onClose } />
          </div>
          { children }
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;