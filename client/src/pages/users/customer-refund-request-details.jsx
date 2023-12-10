import {
   Input,
   TextareaAutosize,
   Typography,
   Button,
   Link,
   TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
   getRefundRequestApiById,
   updateRefundRequestApi,
} from "../../apis/refundRequestApis";
import { toast } from "react-toastify";
import { formatMoney } from "../../helpers/dataHelper";
import { RefundRequestStatus } from "../../enums/refund-request-status";
export default function CustomerRefundRequestDetails() {
   const [data, setData] = useState();
   const [isEdit, setIsEdit] = useState(false);
   const [attachFile, setAttachFile] = useState();

   const params = useParams();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      getRefundRequestApiById(params.id)
         .then((res) => {
            console.log(res.data);
            setData(res.data);
            if (
               location.pathname.includes("edit") &&
               res.data.status === RefundRequestStatus.Pending
            )
               setIsEdit(true);
         })
         .catch((ex) => toast.error(ex));

      return () => setIsEdit(false);
   }, []);

   const updateRefundRequest = () => {
      const submitData = {
         ...data,
         file: attachFile,
      };
      updateRefundRequestApi(submitData)
         .then(() => {
            toast.success("Update successfully!");
            navigate("/users/refund-requests");
         })
         .catch((ex) => {
            toast.error(ex);
         });
   };

   const handleAttachFile = (e) => {
      if (e.target?.files.length > 0 && e.target.files[0]) {
         setAttachFile(e.target.files[0]);
      } else setAttachFile(null);
   };

   const backToManagement = () => {
      navigate("/users/refund-requests");
   };

   return (
      <form className="w-full">
         <div className="flex flex-wrap -mx-3 mb-6 mt-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-username"
               >
                  Username
               </label>
               <Input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Username"
                  id="grid-username"
                  value={data?.insurance?.account?.username || "Unknown"}
                  disabled
               />
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-hospital-name"
               >
                  Hospital Name
               </label>
               <Input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Username"
                  id="grid-hospital-name"
                  value={data?.hoptitalName}
                  onChange={() => {
                     isEdit && setData(data?.hoptitalName);
                  }}
               />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-status"
               >
                  Status
               </label>
               <Input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Status"
                  id="grid-status"
                  disabled
                  value={data?.status}
               />
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-reasons"
               >
                  Reasons
               </label>
               <TextareaAutosize
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
                  placeholder="Reasons"
                  id="grid-reasons"
                  value={data?.description}
                  onChange={() => {
                     isEdit && setData(data?.description);
                  }}
                  maxRows={3}
                  minRows={3}
                  disable={!isEdit}
               />
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-reasons"
               >
                  Attach File
               </label>
               {isEdit ? (
                  <>
                     <Input
                        type="file"
                        onChange={handleAttachFile}
                        placeholder="File evidence."
                     />
                  </>
               ) : (
                  <Link className="cursor-pointer" href={`${data?.fileUrl}`}>
                     {data?.fileUrl}
                  </Link>
               )}
            </div>
         </div>

         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0 flex justify-between items-center">
               {isEdit ? (
                  <div>
                     <Typography variant="h6" color="blue-gray">
                        Total Refund Fee
                     </Typography>
                     <TextField
                        type="number"
                        aria-valuemin={0}
                        variant="filled"
                        value={data?.totalRefundFee}
                        onChange={() => setData(data?.totalRefundFee)}
                     />
                  </div>
               ) : (
                  <>
                     <Typography variant="h6" color="blue-gray">
                        Total Refund Fee
                     </Typography>
                     <Typography variant="h6" color="blue-gray">
                        {formatMoney(data?.totalRefundFee)}
                     </Typography>
                  </>
               )}
            </div>
         </div>
         <div className="flex justify-end w-full gap-4">
            {isEdit && (
               <Button
                  variant="contained"
                  color="success"
                  onClick={() => updateRefundRequest(data?.refundID)}
               >
                  Save
               </Button>
            )}
            <Button
               variant="text"
               color="inherit"
               onClick={() => backToManagement()}
            >
               Cancel
            </Button>
         </div>
      </form>
   );
}