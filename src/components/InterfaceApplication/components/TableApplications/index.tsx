import { useState } from 'react';
import { IApplicationMessageResponse, IApplicationResponse } from '../../../../common/models/response/ApplicationResponse';
import { Link } from '@mui/material';
import { format } from 'date-fns';
import TableContainer from '@mui/material/TableContainer';
import CheckApplication from '../Modals/CheckApplication';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';

type TypeTableColumn = {
  id: number,
  title: string,
};

type TypeTable = {
  columns: TypeTableColumn[],
  rows: IApplicationResponse[],
  setApplications: (applications: IApplicationResponse[]) => void,
};

const TableApplications = (props: TypeTable) => {
  const { columns, rows, setApplications } = props;
  const [application, setApplication] = useState<IApplicationResponse>({} as IApplicationResponse);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  
  const handleOpen = (application: IApplicationResponse) => () => {    
    setOpenModal(true);
    setApplication(application);
  };

  const translationStatus = {
    Resolved: 'Решено',
    Active: 'Активный',
  } as {[key: string]: string};

  return (
    <div>
      <TableContainer component={Paper}sx={{ minWidth: 650, maxWidth: 1000 }}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(col => <TableCell key={col.id}>{col.title}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th':{ border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}>
                  <Link href={`mailto:${row.email}`}>{row.email}</Link>
                </TableCell>
                <TableCell align="left">{row.message}</TableCell>
                <TableCell align="left">{row.comment}</TableCell>
                <TableCell align="left">{translationStatus[row.status]}</TableCell>
                <TableCell align="left">{format(row.createdAt, 'dd.MM.yyyy')}</TableCell>
                <TableCell align="left" >
                  <EditIcon sx={{ cursor: 'pointer' }} onClick={handleOpen(row)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isOpenModal && 
        <CheckApplication 
          isOpen={isOpenModal} 
          setOpen={setOpenModal} 
          application={application}
          setApplications={setApplications}
      />}
    </div>
  );
};

export default TableApplications;