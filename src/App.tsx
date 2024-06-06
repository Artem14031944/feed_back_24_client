import { useContext, useEffect, useState } from 'react';
import { IUser } from './common/models/IUser';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import AuthUser from './common/services/AuthUser';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const { store } = useContext(Context);
  const logOut = () => store.loguot();

  const getUsers = async () => {
    try {
      const respons = await AuthUser.fetchUsers();  
      //@ts-ignore
      setUsers(respons.data.users);
    } catch (e) {
      console.log(e);
    } 
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  },[]);

  if (store.isLoading) {
    return <div style={{background: 'red'}}>Загрузка...</div>;
  };

  if (!store.isAuth) {
    return <LoginForm/>
  };

  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
      <button onClick={logOut}>Выйти</button>
      <div>
          <button onClick={getUsers}>Получить пользователей</button>
          <div>
            {users?.map((user: IUser) => {
              return <div key={user.email}>{user.email}</div>
            })}
          </div>
        </div>
    </div>
  );
}

export default observer(App);
