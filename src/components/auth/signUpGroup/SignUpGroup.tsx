/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Input from 'components/common/input/Input';
import Button from 'components/common/button/Button';
import { Control, FieldErrorsImpl, UseFormHandleSubmit } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../authCard/AuthCard';
import styles from './SignUpGroup.module.scss';

type Props = {
  inputs: {
    name: string;
    label: string;
    type: string;
  }[];
  onSubmit: (data) => void;
  control: Control<any, any>;
  handleSubmit: UseFormHandleSubmit<any>;
  title: string;
  errors: FieldErrorsImpl<any>;
};

const SignUpGroup = ({ inputs, onSubmit, control, title, handleSubmit }: Props) => {

  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };

  return (
    <AuthCard className={ styles.registerContainer }>
      <h2>{ title }</h2>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.signUpPageInputs }>
          <div className={ styles.signUpPageInputsCentered }>
            { inputs.map((input) => (
              <Input
                key={ input.label }
                control={ control }
                label={ input.label }
                type={ input.type }
                name={ input.name }
                className={ `${ styles[ input.name ] }` }
                { ...input }
              />
            )) }
            <div className={ styles.signUpButtons }>
              <Button text='Wróć' onClick={ onGoBack }/>
              <Button text='Rejestruj' variant='contained' type='submit'/>
            </div>
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignUpGroup;