import {Dialog,DialogContent,DialogTitle,DialogActions, Typography, Button} from "@mui/material";
import type { ReactNode } from "react";
 
interface deleteDialogProps{
  title:string,
  description:string,
  content:ReactNode,
  open:boolean,
  onCancel:()=>void,
  onDelete:()=>void
}
const CommonDelete = ({title,description,content,open,onCancel,onDelete}:deleteDialogProps) => {
  return (
    <>
      <Dialog open={open} onClose={close}>
        <DialogTitle>
          <Typography>{title}</Typography>
          <span>{description}</span>
        </DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete}>Delete</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommonDelete;
