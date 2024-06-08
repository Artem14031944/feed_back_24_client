import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import Loader from './components/Loader';
import './App.css';
import ResponsiveAppBar from './components/AppBar';

function App() {
  const { store } = useContext(Context);
  const logOut = () => store.loguot();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  },[]);


  if (store.isLoading) { return <Loader/> };
  if (!store.isAuth) { return <LoginForm/> };

  return (
    <div className="App">
      <ResponsiveAppBar/>
      {/* <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1> */}
      {/* <button onClick={logOut}>Выйти</button> */}
     
    </div>
  );
}

export default observer(App);
