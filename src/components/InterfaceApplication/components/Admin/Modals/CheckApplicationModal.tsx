import { ChangeEvent, useState } from 'react';
import { IApplicationResponse } from '../../../../../common/models/response/ApplicationResponse';
import { TypeModal, TypeTable } from '../../../types';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ApplicationService from '../../../../../common/services/ApplicationService';
import ModalCustom from '../../../../../common/components/Modals';

export default function CheckApplicationModal(props: TypeModal & TypeTable &  { application: IApplicationResponse }) {
  const { isOpen, setOpen, application, setApplications } = props;
  const [comment, setComment] = useState<string>(application.comment ?? '');

  const handleClose = () => setOpen(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setComment(e.currentTarget.value);  

  const checkApplication = async () => {
    if (!application ||  !comment) return;

    const respons = await ApplicationService.resolved(application.id, comment);    
    setApplications && setApplications(respons?.data.applications)
    setComment('');
    handleClose();
  };

  return (
   <ModalCustom isOpen={isOpen} setOpen={setOpen}>
      <Typography>Ответ на зявку: {application.message}</Typography>
      <TextField
        label="Ответ на заявление"
        sx={{ width: 382, mt: 2 }}
        multiline
        rows={5}
        variant="filled"
        value={comment ?? ''}
        onChange={onChange}
      />
      <Box sx={{ display: 'flex', justifyContent: "flex-end", width: '100%', mt: 2 }}>
        <Button onClick={checkApplication}>Ответить</Button>
      </Box>
   </ModalCustom>
  );
};