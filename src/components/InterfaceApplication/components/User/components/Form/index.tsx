import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Context } from '../../../../../..';
import { observer } from 'mobx-react-lite';
import styles from './style.module.css';

const Form = () => {
  const { store } = useContext(Context);
  const [message, setMessage] = useState<string>('');

  const sendApplication = () => {
    // if (!message) return;

    store.createApplication(store.user.id, message);
    setMessage('');
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