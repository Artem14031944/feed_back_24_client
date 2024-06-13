import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { TypeTable } from '../../../../types';
import { Context } from '../../../../../..';
import { observer } from 'mobx-react-lite';
import ApplicationService from '../../../../../../common/services/ApplicationService';
import styles from './style.module.css';

const Form = (props: TypeTable) => {
  const { setApplications } = props;
  const { store } = useContext(Context);
  const [message, setMessage] = useState<string>('');

  const sendApplication = async () => {
    if (!message || !store.user.id) return;
    try {
      const respons = await ApplicationService.createApplication(store.user.id, message);
      setMessage('');
      setApplications && setApplications(respons.data);
    } catch(err) {
      console.log(err);
    }    
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
     <Button variant='contained' onClick={sendApplication}>Оправить</Button>
    </Box>
   </Box>
  );
};

export default observer(Form);