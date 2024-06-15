import { ChangeEvent, useContext, useState } from 'react';
import { IApplicationResponse } from '../../../../../../common/models/response/ApplicationResponse';
import { TypeModal, TypeTable } from '../../../../types';
import { TextField, Typography } from '@mui/material';
import { Context } from '../../../../../..';
import { LoadingButton } from '@mui/lab';
import ModalCustom from '../../../../../../common/components/Modals';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';

export default function CheckApplicationModal(props: TypeModal & TypeTable &  { application: IApplicationResponse }) {
  const { store } = useContext(Context);
  const { isOpen, setOpen, application, setApplications } = props;
  const [comment, setComment] = useState<string>(application.comment ?? '');
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClose = () => setOpen(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setComment(e.currentTarget.value);  

  const checkApplication = () => {
    if (!application ||  !comment) return;
    setLoading(true);

    store.resolved(application.id, comment)
    .then(res => {
      setApplications && setApplications(res?.data.applications);
      setComment('');
      handleClose();
      toast.success(res?.data.message);
    })
    .catch(err => toast.error(err))
    .finally(() => setLoading(false));
  };

  return (
   <ModalCustom isOpen={isOpen} setOpen={setOpen}>
      <Typography>Ответ на зявку: {application.message}</Typography>
      <TextField
        label={"Ответ на заявку"}
        sx={{ width: 382, mt: 2 }}
        multiline
        rows={5}
        variant={"filled"}
        value={comment ?? ''}
        onChange={onChange}
      />
      <Box sx={{ display: 'flex', justifyContent: "flex-end", width: '100%', mt: 2 }}>
        <LoadingButton 
          onClick={checkApplication}
          loading={isLoading}
        >
          Ответить
        </LoadingButton>
      </Box>
   </ModalCustom>
  );
};