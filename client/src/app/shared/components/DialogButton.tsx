import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  ButtonProps,
} from "@mui/material";
import { useState } from "react";

interface Props extends ButtonProps {
  title: string;
  label: string;
  children: string;
  handleProceed: () => void;
}

export default function DialogButton({
  title,
  label,
  children,
  handleProceed,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    handleProceed();
    setOpen(false);
  };

  return (
    <>
      <Button {...props} onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {label}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button {...props} onClick={handleAction} autoFocus>
            {children}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
