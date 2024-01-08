import { Button, Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
const LoadingWrapper = ({ open }) => {
   return (
      <>
         <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </>
   );
};

export default LoadingWrapper;
