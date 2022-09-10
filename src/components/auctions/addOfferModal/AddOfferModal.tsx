import React from 'react';
import Modal from 'components/common/modal/Modal';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddOfferModal = ({ isOpen, onClose }: Props) => {
  const { control } = useForm({ defaultValues: {
    date: new Date(),
    name: '',
    price: 0,
  } });

  return (
    <Modal isOpen={ isOpen } onClose={ onClose } title='Add new offer'>
      <div></div>
    </Modal>
  );
};

export default AddOfferModal;