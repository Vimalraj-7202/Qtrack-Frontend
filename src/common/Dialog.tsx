import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Typography} from "@mui/material";
import type { ReactNode } from "react";

interface dialogProps {
  title: string;
  description: string;
  content: ReactNode;
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}
const CommonDialog = ({title,description,content,open,onSubmit,onCancel}: dialogProps) => {
  return (
    <>
      <Dialog open={open} onClose={close}>
        <DialogTitle>
          <Typography>{title}</Typography>
          <span>{description}</span>
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={onSubmit}>Submit</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommonDialog;
