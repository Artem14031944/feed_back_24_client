import { ChangeEvent, cloneElement, forwardRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FadeProps, TypeModal } from '../../../types';
import { TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ApplicationService from '../../../../../common/services/ApplicationService';

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other} = props;

  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});
  
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #1876D2',
  borderRadius: 2,
  p: 4,
};
  
export default function CheckApplication(props: TypeModal) {
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
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { TransitionComponent: Fade } }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <p>Ответ на зявку: {application.message}</p>
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
        </Box>
      </Fade>
    </Modal>
  );
};