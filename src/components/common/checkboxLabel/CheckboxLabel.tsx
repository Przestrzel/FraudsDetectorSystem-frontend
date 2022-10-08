import React from 'react';
import Checkbox from '@mui/material/Checkbox';

import styles from './CheckboxLabel.module.scss';

type Props = {
  isChecked: boolean;
  onCheck: (isChecked: boolean) => void;
  text: string;
};

const CheckboxLabel = ({ isChecked, onCheck, text }: Props) => {
  return (
    <div className={ styles.label }>
      <Checkbox
        checked={ isChecked }
        onChange={ (event) => onCheck(event.target.checked) } />
      <div onClick={ () => onCheck(!isChecked) }>{ text }</div>
    </div>
  );
};

export default CheckboxLabel;