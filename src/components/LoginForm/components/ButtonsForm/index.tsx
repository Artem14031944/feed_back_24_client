import { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { Context } from '../../../..';

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
    if (!email || !password) {
      return;
    };

    store.login(email, password);
  };

  const registration = () => {
    if (!email || !password || !name || !role) {
      return;
    };

    store.registration(email, password, name, role);
  };

  return (
    <div>
      {props.typeAuth === 'login' && <Button onClick={login} variant="contained">Войти</Button>} 
      {props.typeAuth === 'registration' &&  <Button onClick={registration} variant="contained">Регистрация</Button>} 
    </div>
  )
}

export default observer(ButtonsForm);