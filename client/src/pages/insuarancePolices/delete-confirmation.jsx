import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
const ConfirmNotification = () => {
  return (
    <Dialog open={true}>
      <DialogTitle>
        {" "}
        <Typography variant="h4">Delete Confirmation</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Are you sure you want to delete ?
        </Typography>
        <Typography variant="subtitle2">
          You can't undo this operation
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">Cancel</Button>
        <Button variant="contained" color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default ConfirmNotification;