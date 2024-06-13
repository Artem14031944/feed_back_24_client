import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { Context } from '.';
import InterfaceApplication from './components/InterfaceApplication';
import ResponsiveAppBar from './components/AppBar';
import LoginForm from './components/LoginForm';
import Loader from './components/Loader';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  },[]);
  
  if (store.isLoading) { return <Loader/> };
  if (!store.isAuth) { return <LoginForm/> };
  
  return (
    <Box>
      <ResponsiveAppBar/>
      <InterfaceApplication/>
    </Box>
  );
}

export default observer(App);
