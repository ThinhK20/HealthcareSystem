import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FormControl, FormLabel, TextareaAutosize, Input } from "@mui/material";
import { Link } from "react-router-dom";
import { createNewRefundRequestApi } from "../../apis/userApis";
import { toast } from "react-toastify";
export default function RefundRequestForm() {
   function onSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      createNewRefundRequestApi(formData)
         .then(() => {
            toast.success("Submit a refund request successfully !");
         })
         .catch(() => toast.error("Something wrong here. Please try again."));
   }

   return (
      <FormControl onSubmit={onSubmit}>
         <Typography variant="h6">
            Create new refund request for your situation
         </Typography>
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
               <Input type="file" placeholder="File evidence." />
            </Grid>
         </Grid>
         <div className="flex justify-end w-full gap-4">
            <button
               type="submit"
               className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
               Submit
            </button>
            <Link
               to="/users/customer-requests"
               className="py-2.5 hover:opacity-70"
            >
               Cancel
            </Link>
         </div>
      </FormControl>
   );
}
