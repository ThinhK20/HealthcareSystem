import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
   FormLabel,
   TextareaAutosize,
   Input,
   Button,
   Box,
   Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { createNewRefundRequestApi } from "../../apis/refundRequestApis.js";
import LoadingWrapper from "../../components/loading/loading.jsx";
export default function RefundRequestForm() {
   const [attachFile, setAttachFile] = useState();
   const [errorMsg, setErrorMsg] = useState("");
   const [isSaving, setIsSaving] = useState(false);
   const [loading, setLoading] = useState(false);

   function onSubmit(e) {
      e.preventDefault();
      setErrorMsg("");

      const formData = new FormData(e.target);
      const submitData = {
         insureId: "1",
         hoptitalName: formData.get("hoptitalName"),
         hoptitalDescription: formData.get("hoptitalDescription"),
         file: attachFile,
         description: formData.get("description"),
         totalRefundFee: formData.get("totalRefundFee"),
      };

      if (
         !submitData.hoptitalName ||
         !submitData.hoptitalDescription ||
         !submitData.file ||
         !submitData.description ||
         !submitData.totalRefundFee
      ) {
         setErrorMsg(() => "Please fill in all the required components.");
         return;
      }
      setIsSaving(() => true);
      createNewRefundRequestApi(submitData)
         .then(() => {
            toast.success("Submit a refund request successfully !");
            e.target.reset();
            setIsSaving(false);
         })
         .catch(() => {
            toast.error("Something wrong here. Please try again.");
            setIsSaving(false);
         });
   }

   const handleAttachFile = (e) => {
      if (e.target?.files.length > 0 && e.target.files[0]) {
         setAttachFile(e.target.files[0]);
      } else setAttachFile(null);
   };

   return (
      <Box component="form" onSubmit={onSubmit}>
         <LoadingWrapper open={isSaving} />
         <Typography variant="h6">
            Create new refund request for your situation
         </Typography>
         {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
         <Grid container spacing={3} marginY={2}>
            <Grid item xs={12} sm={6}>
               <FormLabel>Hospital Name</FormLabel>
               <TextField
                  id="hospital-name"
                  name="hoptitalName"
                  placeholder="Hospital Name"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormLabel>Hospital Description</FormLabel>
               <TextField
                  id="hospital-description"
                  name="hoptitalDescription"
                  placeholder="Hospital Description"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={12}>
               <FormLabel required>Reason</FormLabel>
               <TextareaAutosize
                  maxRows={4}
                  className="w-full p-4"
                  name="description"
                  placeholder="Give a reason for a refund request."
               ></TextareaAutosize>
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormLabel required>Total Refund Fee</FormLabel>
               <br />
               <Input min={0} type="number" name="totalRefundFee" />
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormLabel required>Attach file</FormLabel>
               <br />
               <Input
                  type="file"
                  onChange={handleAttachFile}
                  placeholder="File evidence."
               />
            </Grid>
         </Grid>
         <Button
            type="submit"
            disabled={isSaving}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
         >
            Submit
         </Button>
         <Button>
            <Link
               to="/users/refund-requests"
               className="py-2.5 hover:opacity-70"
            >
               Cancel
            </Link>
         </Button>
      </Box>
   );
}
