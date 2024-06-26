import { useState } from 'react';
import { IApplicationResponse } from '../../../../../../common/models/response/ApplicationResponse';
import { translationStatus } from '../../../../../../common/translat';
import { TypeTable } from '../../../../types';
import { Box, Link } from '@mui/material';
import { format } from 'date-fns';
import CheckApplicationModal from '../Modals/CheckApplicationModal';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import styles from './style.module.css';

const columns = [
  { id: 1, title: 'Email' },
  { id: 2, title: 'Заявка' },
  { id: 3, title: 'Ответ на заявку' },
  { id: 4, title: 'Статус' },
  { id: 5, title: 'Время создание' },
  { id: 6, title: 'Ответить' },
];

const TableApplications = (props: TypeTable) => {
  const { applications, setApplications } = props;
  const [selectedApplication, setSelectedApplication] = useState<IApplicationResponse>({} as IApplicationResponse);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  
  const handleOpen = (application: IApplicationResponse) => () => {    
    setOpenModal(true);
    setSelectedApplication(application);
  };

  return (
    <Box>
      <TableContainer component={Paper}sx={{ minWidth: 650, maxWidth: 1200, maxHeight: 650 }}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(col => <TableCell key={col.id}>{col.title}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.map((application) => (
              <TableRow key={application.id} sx={{ '&:last-child td, &:last-child th':{ border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}>
                  <Link href={`mailto:${application.email}`}>{application.email}</Link>
                </TableCell>
                <TableCell className={styles.row_text_hiden} align="left"><p>{application.message}</p></TableCell>
                <TableCell className={styles.row_text_hiden} align="left"><p>{application.comment ?? '-'}</p></TableCell>
                <TableCell align="left">{translationStatus[application.status]}</TableCell>
                <TableCell align="left">{format(application.createdAt, 'dd.MM.yyyy')}</TableCell>
                <TableCell align="left" >
                  <EditIcon sx={{ cursor: 'pointer' }} onClick={handleOpen(application)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isOpenModal && 
        <CheckApplicationModal 
          isOpen={isOpenModal} 
          setOpen={setOpenModal} 
          application={selectedApplication}
          setApplications={setApplications}
      />}
    </Box>
  );
};

export default TableApplications;