import { FC, ChangeEvent, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import SwitchCroup from './components/SwitchCroup';
import ButtonsForm from './components/ButtonsForm';
import FiledsForm from './components/FiledsForm';
import './style.css';

 const LoginForm: FC = () => {
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('USER');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [typeAuth, setTypeAuth] = useState<string>('login');

  const handleRole = (e: SelectChangeEvent) => setRole(e.target.value);
  const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);

  const listAuth = [
    { id: 1, value: 'login', label: 'Логин' },
    { id: 2, value: 'registration', label: 'Регистрация' },
  ];

  const listRoles = [
    { id: 1, value: 'ADMIN', label: 'Админ' },
    { id: 2, value: 'USER', label: 'Пользователь' },
  ];

  const propsButtonsForm = { email, password, name, role, typeAuth };
  const propsFiledsForm = { ...propsButtonsForm, listRoles, handleName, handleRole, handleEmail, handlePassword };

  return (
    <div className='wrapper_form'>
      <div className='container_form'>
        <SwitchCroup listFormConrolLabel={listAuth} onChange={setTypeAuth} value={typeAuth}/>
        <FiledsForm {...propsFiledsForm}/>
        <ButtonsForm {...propsButtonsForm}/>
      </div>
    </div>
  );
};

export default observer(LoginForm);