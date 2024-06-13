import { useContext, useEffect, useState } from 'react';
import { IApplicationResponse } from '../../../../common/models/response/ApplicationResponse';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../..';
import { Box } from '@mui/material';
import ApplicationService from '../../../../common/services/ApplicationService';
import TableApplications from './components/TableApplications';
import Form from './components/Form';
import styles from './style.module.css';

const User = () => {
  const { store } = useContext(Context);
  const [applications, setApplications] = useState<IApplicationResponse[]>([]);

  const getApplications = async () => {
    if (!store.user.id)  {
      setApplications([]);
    };
    
    try {
      const respons = await ApplicationService.getЕheirApplications(store.user.id);    
      setApplications(respons.data);
    } catch (e) {
      console.log(e);
    } 
  };
  
  useEffect(() => {
    if (store.user.role === 'USER') {
      getApplications();
    }; 
  }, []);

  return (
   <Box className={styles.wrapper}>
    <Box className={styles.container}>
     <TableApplications applications={applications} setApplications={setApplications} />
     <Form setApplications={setApplications} />
    </Box>
   </Box>
  );
};

export default observer(User);