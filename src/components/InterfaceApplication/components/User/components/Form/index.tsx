import { ChangeEvent, useContext, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TypeTable } from '../../../../types';
import { Context } from '../../../../../..';
import { observer } from 'mobx-react-lite';
import styles from './style.module.css';
import toast from 'react-hot-toast';

const Form = (props: TypeTable) => {
  const { setApplications } = props;
  const { store } = useContext(Context);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  
  const sendApplication = () => {
    // if (!message || !store.user.id) return;
    
    setLoading(true);
   
    store.createApplication(store.user.id, message)
    .then(res => {
      console.log(res)
      setMessage('');
      setApplications && setApplications(res.data.applications);
      toast.success(res.data.message)
    })
    .catch(err => toast.error(err))
    .finally(() => setLoading(false));  
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value);  
 
  return (
   <Box>
    <TextField
      label="Заявка"
      className={styles.input}
      multiline
      rows={5}
      variant="filled"
      value={message ?? ''}
      onChange={onChange}
    />
    <Box className={styles.block_button}>
     <LoadingButton 
       variant={'contained'} 
       loading={isLoading} 
       onClick={sendApplication}
      >
        Оправить
      </LoadingButton>
    </Box>
   </Box>
  );
};

export default observer(Form);