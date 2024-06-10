import { FC } from 'react';
import './style.css';

 const Loader: FC = () => {
  return (
    <div className='wrapper_loader'>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loader;