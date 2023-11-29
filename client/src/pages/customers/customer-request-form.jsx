import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import { ButtonGroup } from "@material-tailwind/react";
export default function CustomerRequestForm() {
   return (
      <FormControl>
         <Typography variant="h6">Create new request for insurance</Typography>
         <Grid container spacing={3} marginY={2}>
            <Grid item xs={12} sm={6}>
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
               </Select>
            </Grid>

            <Grid item xs={12}>
               <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12}>
               <FormControlLabel
                  control={
                     <Checkbox
                        color="secondary"
                        name="saveAddress"
                        value="yes"
                     />
                  }
                  label="Use this address for payment details"
               />
            </Grid>
         </Grid>
         <ButtonGroup></ButtonGroup>
      </FormControl>
   );
}
