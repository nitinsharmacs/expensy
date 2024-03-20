import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { ReactComponentElement } from 'react';
import DialogBar from '../DialogBar/DialogBar';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface SlideUpDialogProps {
  title: string;
  open: boolean;
  close: () => void;
  children: ReactComponentElement<any> | ReactComponentElement<any>[];
}

const SlideUpDialog = (props: SlideUpDialogProps) => {
  return (
    <Dialog fullScreen open={props.open} TransitionComponent={Transition}>
      <DialogBar title={props.title} close={props.close} />
      {props.children}
    </Dialog>
  );
};

export default SlideUpDialog;
