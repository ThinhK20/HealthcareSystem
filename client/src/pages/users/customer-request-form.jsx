import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, FormLabel, Select, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllPolicyPackagesApi } from "../../apis/policyPackageApis";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Periodic } from "../../enums/periodic";
import { createCustomerRequestApi } from "../../apis/customerRequestApis";
import LoadingWrapper from "../../components/loading/loading";
export default function CustomerRequestForm() {
   const [policyPackages, setPolicyPackages] = useState([]);
   const [selectedPolicyPackage, setSelectedPolicyPackage] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();
   useEffect(() => {
      const source = axios.CancelToken.source();
      getAllPolicyPackagesApi(source.token)
         .then((res) => {
            setPolicyPackages(res.data);
         })
         .catch((e) => toast(e));

      return () => source.cancel();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const submitData = {
         accountId: 1,
         packageId: selectedPolicyPackage.packageid,
         periodic: formData.get("periodic"),
      };

      setIsLoading(true);

      createCustomerRequestApi(submitData)
         .then(() => {
            toast.success("Request successfully !");
            navigate("/users/customer-requests");
         })
         .catch((err) => toast.error(err))
         .finally(() => setIsLoading(false));
   };

   return (
      <Box component="form" onSubmit={handleSubmit}>
         <LoadingWrapper open={isLoading} />
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
                  <MenuItem value={Periodic.Quarter} className="capitalize">
                     {Periodic.Quarter}
                  </MenuItem>
                  <MenuItem value={Periodic.Year} className="capitalize">
                     {Periodic.Year}
                  </MenuItem>
                  <MenuItem value={Periodic.HalfYear} className="capitalize">
                     {Periodic.HalfYear}
                  </MenuItem>
               </Select>
            </Grid>
         </Grid>
         <div className="flex justify-end w-full gap-4">
            <Button
               type="submit"
               className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
               Submit
            </Button>
            <Link
               to="/users/customer-requests"
               className="py-2.5 hover:opacity-70"
            >
               Cancel
            </Link>
         </div>
      </Box>
   );
}
