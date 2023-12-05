import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllPolicyPackagesApi } from "../../apis/policyPackageApis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function CustomerRequestForm() {
   const [policyPackages, setPolicyPackages] = useState([]);
   const [selectedPolicyPackage, setSelectedPolicyPackage] = useState();

   useEffect(() => {
      const source = axios.CancelToken.source();
      getAllPolicyPackagesApi(source.token)
         .then((res) => {
            setPolicyPackages(res.data);
         })
         .catch((e) => toast(e));

      return () => source.cancel();
   }, []);

   return (
      <FormControl>
         <Typography variant="h6">
            Create new register request for insurance
         </Typography>
         <Grid container spacing={3} marginY={2}>
            <Grid item xs={12} sm={12}>
               <FormLabel required>Package</FormLabel>
               <Select
                  variant="outlined"
                  labelId="package-select-label"
                  id="package-select"
                  label="Package"
                  required
                  fullWidth
                  placeholder="Package"
               >
                  {policyPackages?.map((policyPackage, index) => (
                     <MenuItem
                        key={index}
                        onClick={() => setSelectedPolicyPackage(policyPackage)}
                        value={policyPackage?.packageid}
                     >
                        {policyPackage?.name}
                     </MenuItem>
                  ))}
               </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
               <FormLabel>Package Name</FormLabel>

               <TextField
                  disabled
                  id="package-name"
                  name="package-name"
                  placeholder="Package Name"
                  fullWidth
                  value={selectedPolicyPackage?.name}
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormLabel>Package Description</FormLabel>
               <TextField
                  disabled
                  id="package-description"
                  name="package-description"
                  placeholder="Package Description"
                  value={selectedPolicyPackage?.description}
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormLabel required>Periodic</FormLabel>
               <Select
                  required
                  id="periodic"
                  name="periodic"
                  label="Periodic"
                  fullWidth
                  variant="outlined"
               >
                  <MenuItem value="monthly">Month</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
               </Select>
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
