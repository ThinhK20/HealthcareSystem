/* eslint-disable react/prop-types */
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Box, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { deleteAccountApi } from "../../apis/userApis";
import { toast } from "react-toastify";
export const DeleteAccount = ({ accountId }) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleClose = () => {
      setIsOpen(false);
   };

   const handleOpen = () => {
      setIsOpen(true);
   };

   const handleDelete = () => {
      deleteAccountApi(accountId)
         .then((res) => {
            toast.success(res.data);
            handleClose();
         })
         .catch((ex) => toast.error(ex));
   };

   return (
      <>
         <Button onClick={handleOpen}>
            <FontAwesomeIcon icon={faTrash} />
         </Button>
         <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className="bg-slate-100 p-4 rounded-2xl absolute top-[25%] left-1/2 -translate-x-[50%]">
               <Typography
                  className="pb-4"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
               >
                  Delete Your Account
               </Typography>
               <Alert severity="error">This action cannot be undone.</Alert>
               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure you want to permanently delete your account?
               </Typography>
               <Box component="div" className="pt-4 flex justify-end gap-4">
                  <Button variant="contained" onClick={handleDelete}>
                     Yes
                  </Button>
                  <Button variant="text" onClick={handleClose}>
                     Cancel
                  </Button>
               </Box>
            </Box>
         </Modal>
      </>
   );
};
