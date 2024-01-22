import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Alert, AlertTitle } from "@mui/material";
import {
   getAccountByAccountId,
   getAccountByUserID,
   updateAccountsPassword,
} from "../../apis/accountApis";
import * as jwt from "jwt-decode";
const EditAccount = () => {
   const [open, setOpen] = React.useState(false);
   const theme = useTheme();
   const [currentRole, setCurrentRole] = useState("");
   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
   const [password, setPassword] = useState("");
   const [oldPass, setOldPass] = useState("");
   const [newPass, setNewPass] = useState("");
   const [confirmPass, setConfirmPass] = useState("");
   const [message, setMessage] = useState("");
   const [messageSuccess, setMessageSuccess] = useState("");

   const handleClickOpen = () => {
      setFormDataPUT(() => ({
         accountId: formDataAccount.accountId,
         username: formDataAccount.username,
         oldPassword: oldPass,
         newPassword: newPass,
      }));
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const [formDataAccount, setFormDataAccount] = useState({
      accountId: "",
      userId: "",
      username: "",
      password: "",
      status: "Active",
      role: "Customer",
   });
   const [formDataPUT, setFormDataPUT] = useState({
      accountId: "",
      username: "",
      oldPassword: "",
      newPassword: "",
   });

   const handleChangePassword = async () => {
      if (oldPass === "" || newPass === "" || confirmPass === "") {
         setMessage("Vui lòng nhập đầy đủ thông tin.");
      } else if (newPass !== confirmPass) {
         setMessage("Mật khẩu mới không trùng khớp.");
      } else if (newPass === oldPass) {
         setMessage("Mật khẩu mới trùng mật khẩu cũ. ");
      } else {
         console.log(formDataAccount);
         if (formDataPUT.password != "") {
            try {
               updateAccountsPassword(formDataPUT).then((result) => {
                  if (result != null) {
                     setMessage("");
                     setMessageSuccess("Information changed successfully");
                  } else {
                     setMessage("Change information failed");
                  }
               });
            } catch {
               // Xử lý lỗi
               setMessage("Change information failed");
            }
         }
      }
   };

   const handleInputChangeAccount = (e) => {
      const { name, value } = e.target;
      setFormDataAccount((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleFormSubmit = async () => {
      console.log(oldPass, newPass, confirmPass, password);
      await handleChangePassword();
      console.log(oldPass, newPass, confirmPass, password);
      handleClose();
   };

   function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
   }

   useEffect(() => {
      const Decode = async () => {
         const tokenValue = getCookie("token")
         const accountId = localStorage.getItem("accountId")
         getAccountByAccountId(accountId).then((result) => {
            const userStaffData = result;
            setFormDataAccount((prevData) => ({
               ...prevData,
               accountId: userStaffData?.accountId || "",
               userId: userStaffData?.userId || "",
               username: userStaffData?.username || "",
               password: "",
               status: userStaffData?.status || "Active",
               role: userStaffData?.role || "User",
            }));
            setPassword(userStaffData?.password);
         });
      };
      Decode();
   }, []);
   return (
      <div className="w-full">
         <div className="w-[60%] m-auto">
            <div className="space-y-12">
               <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                     Profile
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                     This information will be displayed publicly so be careful
                     what you share.
                  </p>
                  {message != "" && (
                     <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        This is an error alert — <strong>{message}</strong>
                     </Alert>
                  )}
                  {messageSuccess != "" && (
                     <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert —{" "}
                        <strong>{messageSuccess}</strong>
                     </Alert>
                  )}
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                     <div className="sm:col-span-4">
                        <label
                           htmlFor="username"
                           className="block text-sm font-medium leading-6 text-gray-900"
                        >
                           Username
                        </label>
                        <div className="mt-2">
                           <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                 required
                                 disabled
                                 type="text"
                                 name="username"
                                 id="username"
                                 autoComplete="username"
                                 className="block flex-1 border-0 bg-transparent py-1.5 pl-[10px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                 placeholder="janesmith"
                                 value={formDataAccount.username}
                                 onChange={handleInputChangeAccount}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="sm:col-span-4">
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium leading-6 text-gray-900"
                        >
                           Old Password
                        </label>
                        <div className="mt-2">
                           <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                 required
                                 type="password"
                                 name="password"
                                 id="password"
                                 autoComplete="password"
                                 className=" block flex-1 border-0 bg-transparent py-1.5 pl-[10px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                 value={oldPass}
                                 onChange={(e) => setOldPass(e.target.value)}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="sm:col-span-4">
                        <label
                           htmlFor="username"
                           className="block text-sm font-medium leading-6 text-gray-900"
                        >
                           New Password
                        </label>
                        <div className="mt-2">
                           <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                 required
                                 type="password"
                                 name="password1"
                                 id="password1"
                                 autoComplete="password1"
                                 className=" block flex-1 border-0 bg-transparent py-1.5 pl-[10px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                 value={newPass}
                                 onChange={(e) => setNewPass(e.target.value)}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="sm:col-span-4">
                        <label
                           htmlFor="username"
                           className="block text-sm font-medium leading-6 text-gray-900"
                        >
                           Confirm New Password
                        </label>
                        <div className="mt-2">
                           <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                 required
                                 type="password"
                                 name="password2"
                                 id="password2"
                                 autoComplete="password2"
                                 className=" block flex-1 border-0 bg-transparent py-1.5 pl-[10px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                 value={confirmPass}
                                 onChange={(e) =>
                                    setConfirmPass(e.target.value)
                                 }
                              />
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

               <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                     Notifications
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                     We will always let you know about important changes, but
                     you pick what else you want to hear about.
                  </p>
               </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
               <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => console.log(formDataAccount)}
               >
                  Cancel
               </button>
               <button
                  onClick={handleClickOpen}
                  className="rounded-md bg-[#028AA9] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
                  Save
               </button>
            </div>
         </div>
         <>
            <Dialog
               fullScreen={fullScreen}
               open={open}
               onClose={handleClose}
               aria-labelledby="responsive-dialog-title"
            >
               <DialogTitle id="responsive-dialog-title">
                  {"Use Google's location service?"}
               </DialogTitle>
               <DialogContent>
                  <DialogContentText>
                  Are you sure you want to change your old password?
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                     Disagree
                  </Button>
                  <Button onClick={handleFormSubmit} autoFocus>
                     Agree
                  </Button>
               </DialogActions>
            </Dialog>
         </>
      </div>
   );
};
export default EditAccount;
