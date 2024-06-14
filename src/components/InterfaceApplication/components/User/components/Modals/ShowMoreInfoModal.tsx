import React from 'react'
import { IApplicationResponse } from '../../../../../../common/models/response/ApplicationResponse';
import { translationStatus } from '../../../../../../common/translat';
import { TypeModal, TypeTable } from '../../../../types';
import { checkTimeUpdate } from '../../../../utils';
import { Box, Typography } from '@mui/material';
import { format } from "date-fns";
import ModalCustom from '../../../../../../common/components/Modals';

export default function ShowMoreInfoModal(props: TypeModal & TypeTable & { application: IApplicationResponse }) {
  const { isOpen, setOpen, application } = props;
  
  return (
    <ModalCustom isOpen={isOpen} setOpen={setOpen}>
     <Typography sx={{ mb: 2}} variant='h4'>Подробная информация об заявке</Typography>
     <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
      <Typography sx={{ fontWeight: 500 }}>Заявка: <Typography variant='caption'>{application.message}</Typography></Typography>
      <Typography sx={{ fontWeight: 500 }}>Ответ на заявку: <Typography  variant='caption'>{application.comment ?? '-'}</Typography></Typography>
      <Typography sx={{ fontWeight: 500 }}>Время создание: <Typography variant='caption'>{format(application.createdAt, 'HH:MM:SS dd.MM.yyyy')}</Typography></Typography>
      <Typography sx={{ fontWeight: 500 }}>Время ответа: <Typography variant='caption'>{checkTimeUpdate(application.createdAt, application.updatedAt!, 'HH:MM:SS dd.MM.yyyy')}</Typography></Typography>
      <Typography sx={{ fontWeight: 500 }}>Статус: <Typography variant='caption'>{translationStatus[application.status]}</Typography></Typography>
     </Box>
    </ModalCustom>
  );
};