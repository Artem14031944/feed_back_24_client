import { FC, useContext, useEffect, useState } from 'react';
import { IApplicationResponse } from '../../common/models/response/ApplicationResponse';
import { Box, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import ApplicationService from '../../common/services/ApplicationService';
import TableApplications from './components/TableApplications';
import FormUser from './components/FormUser';
import './style.css';

const columns = [
  { id: 1, title: 'Email' },
  { id: 2, title: 'Заявка' },
  { id: 3, title: 'Ответ на заявку' },
  { id: 4, title: 'Статус' },
  { id: 5, title: 'Время создание' },
  { id: 6, title: 'Ответить' },
];

const InterfaceApplication: FC = () => { 
  const { store } = useContext(Context);
  const [applications, setApplications] = useState<IApplicationResponse[]>([]);

  const isAdmin = store.user.role === 'ADMIN';
  const isUser = store.user.role === 'USER';

  const getApplications = async () => {
    try {
      const respons = await ApplicationService.fetchApllication();    
      setApplications(respons.data);
    } catch (e) {
      console.log(e);
    } 
  };

  useEffect(() => {
    if (isAdmin) { getApplications() };
  }, []);

  return (
    <Box>
     {isAdmin && <div className='interface_admin'>
        <TableApplications columns={columns} rows={applications} setApplications={setApplications}/>
        <Button variant='contained' onClick={getApplications}>Получить заявки</Button>
      </div>} 
      {isUser && <div className='interface_user'>
        <FormUser/>
      </div>}
    </Box>
  );
};

export default observer(InterfaceApplication);