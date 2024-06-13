import { FC, useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { Context } from '../..';
import Admin from './components/Admin';
import User from './components/User';

const InterfaceApplication: FC = () => { 
  const { store } = useContext(Context);

  const variantInterface = {
    "ADMIN": <Admin/>,
    "USER": <User/>,
  } as { [key: string]: ReactNode };

  return <Box>{variantInterface[store.user.role]}</Box>;
};

export default observer(InterfaceApplication);