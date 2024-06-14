import { cloneElement, forwardRef } from 'react';
import { FadeProps, TypeModal } from '../../../components/InterfaceApplication/types';
import { useSpring, animated } from '@react-spring/web';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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
//  width: 450,
 bgcolor: 'background.paper',
 border: '2px solid #1876D2',
 borderRadius: 2,
 p: 4,
};

export default function ModalCustom(props: TypeModal) {
  const { isOpen, setOpen, children} = props;
  const handleClose = () => setOpen(false);

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
      <Box sx={style}>{children}</Box>
     </Fade>
    </Modal>
  );
};