import {
   Input,
   TextareaAutosize,
   Typography,
   Button,
   Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import {
   acceptRefundRequestApiById,
   getRefundRequestApiById,
   rejectRefundRequestApiById,
} from "../../apis/refundRequestApis";
import { toast } from "react-toastify";
import { formatMoney } from "../../helpers/dataHelper";
import { getAllRefundDetailsByRefundIdApi } from "../../apis/refundDetailApis";
export default function RefundRequestDetails() {
   const [data, setData] = useState();
   const params = useParams();
   const navigate = useNavigate();
   const [refundDetails, setRefundDetails] = useState([]);

   const getRefundDetails = async () => {
      const refundId = params.id;
      const dataRefundDetails = await getAllRefundDetailsByRefundIdApi(
         refundId
      );
      setRefundDetails(dataRefundDetails);
   };

   useEffect(() => {
      getRefundRequestApiById(params.id)
         .then((res) => {
            setData(res.data);
         })
         .catch((ex) => toast.error(ex));

      getRefundDetails();
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


   const getTotalRefundRequest = () => {
      const total = refundDetails.reduce((acc, curr) => {
         return acc + curr.refundFee;
      }, 0);
      return total;
   }

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
                  Expected Refund Fee
               </Typography>
               <Typography variant="h6" color="blue-gray">
                  {formatMoney(data?.totalRefundFee)}
               </Typography>
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0 flex justify-between items-center">
               <Typography variant="h6" color="red">
                  Total Refund Fee
               </Typography>
               <Typography variant="h6" color="red">
                  {formatMoney(getTotalRefundRequest())}
               </Typography>
            </div>
         </div>
         <div>
         <RouterLink to={`/staffs/refund/${data?.refundID}`} class="bg-blue-300 hover:bg-blue-400 text-gray-800  py-2 px-4 rounded inline-flex items-center">
            <span>Create refund details</span>
            </RouterLink>
         </div>
         {/* Table */}
         <table className="min-w-full text-left text-sm font-light my-8">
            <thead
               className="border-b bg-white font-medium "
               style={{ background: "#FFD000" }}
            >
               <tr>
                  <th scope="col" className="px-6 py-4">
                     Id
                  </th>
                  <th scope="col" className="px-6 py-4">
                     Insurance Policy
                  </th>
                  <th scope="col" className="px-6 py-4">
                     Description
                  </th>
                  <th scope="col" className="px-6 py-4">
                     Refund Fee
                  </th>
                  <th scope="col" className="px-6 py-4">
                     Paid Fee
                  </th>
               </tr>
            </thead>
            <tbody>
               <tr className="border-b  ">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                     Details of Fees
                  </td>
               </tr>
               {refundDetails?.map((refundDetail, index) => (
                  <tr key={index} className="border-b bg-neutral-100 ">
                     <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                        {index + 1}
                     </td>
                     <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                        {refundDetail.insurancePolicy.name}
                     </td>
                     <td className="whitespace-nowrap px-6 py-4">
                        {refundDetail.insurancePolicy.description}
                     </td>
                     <td className="whitespace-nowrap px-6 py-4">
                        {formatMoney(refundDetail.refundFee)}
                     </td>
                     <td className="whitespace-nowrap px-6 py-4">
                        {formatMoney(refundDetail.paidFee)}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
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
