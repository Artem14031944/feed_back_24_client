import { useContext, useEffect, useState } from 'react'
import { IApplicationResponse } from '../../../../common/models/response/ApplicationResponse';
import { Box, Button } from '@mui/material'
import { Context } from '../../../..';
import ApplicationService from '../../../../common/services/ApplicationService';
import TableApplications from './components/Table';
import styles from './style.module.css';

const Admin = () => {
  const { store } = useContext(Context);
  const [applications, setApplications] = useState<IApplicationResponse[]>([]);

  const getApplications = async () => {
    try {
      const respons = await ApplicationService.fetchApllication();    
      setApplications(respons.data);
    } catch (e) {
      console.log(e);
    } 
  };

  useEffect(() => {
    if (store.user.role === 'ADMIN') { 
      getApplications() 
    };
  }, []);

  return (
    <Box className={styles.wrapper}>
      <TableApplications applications={applications} setApplications={setApplications}/>
      <Button variant='contained' onClick={getApplications}>Получить заявки</Button>
    </Box>
  );
};

export default Admin;