import { FC, FormEvent, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

 const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);
 
  const handleEmail = (e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);
  const handlePassword = (e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
  const login = () => store.login(email, password);
  const registration = () => store.registration(email, password);

  return (
    <div>
      <input type='text' value={email} onChange={handleEmail} placeholder='Email'/>
      <input type='password' value={password} onChange={handlePassword} placeholder='Пароль'/>
      <button onClick={login}>Логин</button>
      <button onClick={registration}>Регистрация</button>
    </div>
  )
};

export default observer(LoginForm);