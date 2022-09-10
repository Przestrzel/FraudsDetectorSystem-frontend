import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
      <InfinitySpin
        width='100'
        color='#007FFF'
      />
    </div>
  );
};

export default Loader;