import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../..';

const FormUser = () => {
  const { store } = useContext(Context);
  const [message, setMessage] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value);  
  const sendApplication = () => {
    if (!message) return;

    store.createApplication(store.user.id, message);
    setMessage('');
  };
  
  return (
    <Box>
      <TextField
        label="Заявка"
        sx={{ width: 382, mt: 2 }}
        multiline
        rows={5}
        variant="filled"
        value={message ?? ''}
        onChange={onChange}
      />
      <Box sx={{ mt: 2 }}>
        <Button variant='contained' onClick={sendApplication}>Оправить заявку</Button>
      </Box>
    </Box>
  );
};

export default observer(FormUser);