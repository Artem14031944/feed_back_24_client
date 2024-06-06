import { createContext } from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import Store from './store/store';
import App from './App';
import './index.css';

interface IStore {
  store: Store,
};

const store = new Store();
export const Context = createContext({ store } as IStore);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);

reportWebVitals();
