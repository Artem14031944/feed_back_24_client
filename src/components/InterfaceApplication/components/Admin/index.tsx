import { useContext, useEffect, useState } from 'react'
import { IApplicationResponse } from '../../../../common/models/response/ApplicationResponse';
import { LoadingButton } from '@mui/lab';
import { Context } from '../../../..';
import { Box } from '@mui/material'
import TableApplications from './components/Table';
import styles from './style.module.css';

const Admin = () => {
  const { store } = useContext(Context);
  const [applications, setApplications] = useState<IApplicationResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  
  const updateApplications =  () => {    
    setLoading(true);
    store.getApplications()
    .then((res) => setApplications(res.data))
    .catch(err => console.log(err))
    .finally(() => setLoading(false));    
  };

  useEffect(() => {
    if (store.user.role === 'ADMIN') { 
      updateApplications();
    };
  }, []);

  return (
    <Box className={styles.wrapper}>
      <TableApplications applications={applications} setApplications={setApplications}/>
      <Box className={styles.block_button}>
        <LoadingButton 
          variant={'contained'} 
          onClick={updateApplications}
          loading={isLoading}
        >
          Обновить
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Admin;