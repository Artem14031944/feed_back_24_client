import { useContext, useEffect, useState } from 'react';
import { IApplicationResponse } from '../../../../../../common/models/response/ApplicationResponse';
import { translationStatus } from '../../../../../../common/translat';
import { Context } from '../../../../../..';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import ApplicationService from '../../../../../../common/services/ApplicationService';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import styles from './style.module.css';

const columns = [
  { id: 1, title: 'Заявка' },
  { id: 2, title: 'Ответ на заявку' },
  { id: 3, title: 'Время создание' },
  { id: 4, title: 'Время ответа' },
  { id: 5, title: 'Статус' },
];

const TableApplications = () => {
  const { store } = useContext(Context);
  const [applications, setApplications] = useState<IApplicationResponse[]>([]);
  
  const getApplications = async () => {
    try {
      if (!store.user.id)  {
        setApplications([]);
      };

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

  const checkTimeUpdate = (createdAt: string, updatedAt: string) => {
    if (Number(new Date(createdAt)) !== Number( new Date(updatedAt))) return format(updatedAt, 'dd.MM.yyyy');
    else return 'Пока нет ответили'
  };

  return (
    <Box>
      <TableContainer component={Paper}sx={{ minWidth: 800, maxWidth: 1000, maxHeight: 650 }}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(col => <TableCell key={col.id}>{col.title}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id} sx={{ '&:last-child td, &:last-child th':{ border: 0 } }}>
                <TableCell className={styles.row_text_hiden} align="left"><p>{application.message}</p></TableCell>
                <TableCell className={styles.row_text_hiden} align="left"><p>{application.comment}</p></TableCell>
                <TableCell align="left">{format(application.createdAt, 'dd.MM.yyyy')}</TableCell>
                <TableCell align="left">{checkTimeUpdate(application.createdAt, application.updatedAt!)}</TableCell>
                <TableCell align="left">{translationStatus[application.status]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default observer(TableApplications);