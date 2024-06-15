import { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Box, Button } from '@mui/material';
import { Context } from '../../../..';
import toast from 'react-hot-toast';

type TypeButtonsForm = {
  typeAuth: string,
  email: string,
  password: string,
  name: string,
  role: string,
};

const ButtonsForm = (props: TypeButtonsForm) => {
  const { store } = useContext(Context);
  const { email, password, name, role } = props;

  const login = () => {
    store.login(email, password)
    .then(() => toast.success('Вход выполнен'))
    .catch(err => toast.error(err));
  };

  const registration = () => {
    store.registration(email, password, name, role)
    .then(() => toast.success('Вход выполнен'))
    .catch(err => toast.error(err));
  };

  return (
    <Box>
      {props.typeAuth === 'login' && <Button onClick={login} variant="contained">Войти</Button>} 
      {props.typeAuth === 'registration' && <Button onClick={registration} variant="contained">Регистрация</Button>} 
    </Box>
  );
};

export default observer(ButtonsForm);