import {
   Input,
   TextareaAutosize,
   Typography,
   Button,
   Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
   acceptRefundRequestApiById,
   getRefundRequestApiById,
   rejectRefundRequestApiById,
} from "../../apis/refundRequestApis";
import { toast } from "react-toastify";
import { formatMoney } from "../../helpers/dataHelper";
export default function RefundRequestDetails() {
   const [data, setData] = useState();
   const params = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      getRefundRequestApiById(params.id)
         .then((res) => {
            setData(res.data);
         })
         .catch((ex) => toast.error(ex));
   }, []);

   const acceptRefundRequest = (id) => {
      acceptRefundRequestApiById(id).then(() => {
         toast.success(`Accept refund request with id:${id} successfully.`);
         backToManagement();
      });
   };

   const rejectRefundRequest = (id) => {
      rejectRefundRequestApiById(id).then(() => {
         toast.success(`Reject refund request with id:${id} successfully.`);
         backToManagement();
      });
   };

   const backToManagement = () => {
      navigate("/staffs/refund-requests");
   };

   return (
      <form className="w-full">
         <div className="flex flex-wrap -mx-3 mb-6">
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
                  value="Tuan Minh"
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
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Reasons"
                  id="grid-reasons"
                  value={data?.description}
                  maxRows={3}
                  minRows={3}
                  disabled
                  readonly
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
               <Link className="cursor-pointer" href={`${data?.fileUrl}`}>
                  {data?.fileUrl}
               </Link>
            </div>
         </div>

         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0 flex justify-between items-center">
               <Typography variant="h6" color="blue-gray">
                  Total Refund Fee
               </Typography>
               <Typography variant="h6" color="blue-gray">
                  {formatMoney(data?.totalRefundFee)}
               </Typography>
            </div>
         </div>
         <div className="flex justify-end w-full gap-4">
            {data?.status !== "Approved" && data?.status !== "Rejected" && (
               <>
                  <Button
                     variant="contained"
                     color="success"
                     onClick={() => acceptRefundRequest(data?.refundID)}
                  >
                     Accept
                  </Button>
                  <Button
                     variant="contained"
                     color="error"
                     onClick={() => rejectRefundRequest(data?.refundID)}
                  >
                     Reject
                  </Button>
               </>
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