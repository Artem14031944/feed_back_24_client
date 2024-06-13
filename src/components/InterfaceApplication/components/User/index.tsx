import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import styles from './style.module.css';
import TableApplications from './components/TableApplications';
import Form from './components/Form';

const User = () => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        <TableApplications/>
        <Form/>
      </Box>
    </Box>
  );
};

export default observer(User);