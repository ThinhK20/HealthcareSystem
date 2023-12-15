import {
   Card,
   CardHeader,
   Typography,
   Button,
   CardBody,
   CardFooter,
   Avatar,
   IconButton,
   Chip,
} from "@material-tailwind/react";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faEye,
   faPencil,
   faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAllRefundRequestByUserIdApi } from "../../apis/refundRequestApis";
import { toast } from "react-toastify";
import { formatDate, formatMoney } from "../../helpers/dataHelper";
import { RefundRequestStatus } from "../../enums/refund-request-status";
const TABLE_HEAD = [
   "Id",
   "User",
   "Hospital Name",
   "Description",
   "Refund Fee",
   "Date Send",
   "Date Refund",
   "Status",
   "",
];

export function CustomerRefundRequestManagement() {
   const [refundRequests, setRefundRequests] = useState();
   const [tableRows, setTableRows] = useState([]);

   useEffect(() => {
      const userId = 1;
      const source = axios.CancelToken.source();
      getAllRefundRequestByUserIdApi(userId, source.token)
         .then((res) => {
            setRefundRequests(res.data);
         })
         .catch((e) => {
            toast.error(e);
         });

      return () => {
         source.cancel();
      };
   }, []);

   useEffect(() => {
      console.log(refundRequests);
      setTableRows(() => {
         const newRows = refundRequests?.map((request) => ({
            img: "https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg",
            user: request.insurance?.account,
            hospitalName: request.hoptitalName,
            description: request.description,
            refundFee: request.totalRefundFee,
            dateSend: request.dateSend,
            dateRefund: request.dateRefund,
            status: request.status,
            refundID: request.refundID,
         }));
         return newRows;
      });
   }, [refundRequests]);

   return (
      <Card className="h-full w-full">
         <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
               <div>
                  <Typography variant="h5" color="blue-gray">
                     Refund Requests Management
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                     These are details about your refund requests to HealthCare
                     System Company
                  </Typography>
               </div>
               <div className="flex w-full shrink-0 gap-2 md:w-max">
                  <Button size="sm">
                     <Link
                        to={"/users/refund-requests/create"}
                        className="flex items-center gap-3"
                     >
                        <FontAwesomeIcon icon={faPlusCircle} size="2xl" />
                        New
                     </Link>
                  </Button>
               </div>
            </div>
         </CardHeader>
         <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
               <thead>
                  <tr>
                     {TABLE_HEAD.map((head) => (
                        <th
                           key={head}
                           className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                        >
                           <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                           >
                              {head}
                           </Typography>
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {tableRows?.map((tableRow, index) => {
                     const isLast = index === tableRows.length - 1;
                     const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                     return (
                        <tr key={index}>
                           <td className={classes}>
                              <div className="flex items-center gap-3">
                                 <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                 >
                                    {tableRow.refundID}
                                 </Typography>
                              </div>
                           </td>
                           <td className={classes}>
                              <div className="flex items-center gap-3">
                                 <Avatar
                                    src={tableRow.img}
                                    alt={tableRow.user?.username}
                                    size="md"
                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                 />
                                 <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                 >
                                    {tableRow.user?.username}
                                 </Typography>
                              </div>
                           </td>
                           <td className={classes}>
                              <div className="flex items-center gap-3">
                                 <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                 >
                                    {tableRow.hospitalName}
                                 </Typography>
                              </div>
                           </td>
                           <td className={classes}>
                              <Typography
                                 variant="small"
                                 color="blue-gray"
                                 className="font-normal max-w-xs"
                              >
                                 {tableRow.description}
                              </Typography>
                           </td>
                           <td className={classes}>
                              <Typography
                                 variant="small"
                                 color="blue-gray"
                                 className="font-normal"
                              >
                                 {formatMoney(tableRow.refundFee)}
                              </Typography>
                           </td>
                           <td className={classes}>
                              <Typography
                                 variant="small"
                                 color="blue-gray"
                                 className="font-normal"
                              >
                                 {formatDate(tableRow.dateSend)}
                              </Typography>
                           </td>
                           <td className={classes}>
                              <Typography
                                 variant="small"
                                 color="blue-gray"
                                 className="font-normal"
                              >
                                 {formatDate(tableRow.dateRefund)}
                              </Typography>
                           </td>
                           <td className={classes}>
                              <div className="w-max">
                                 <Chip
                                    size="sm"
                                    variant="ghost"
                                    value={tableRow.status}
                                    color={
                                       tableRow.status === "Approved"
                                          ? "green"
                                          : tableRow.status === "Pending"
                                          ? "amber"
                                          : "red"
                                    }
                                 />
                              </div>
                           </td>
                           <td className={classes}>
                              <Link
                                 to={`/users/refund-requests/${tableRow.refundID}`}
                              >
                                 <Tooltip title="View details">
                                    <IconButton variant="text">
                                       <FontAwesomeIcon
                                          className="h-4 w-4"
                                          icon={faEye}
                                       />
                                    </IconButton>
                                 </Tooltip>
                              </Link>
                              {tableRow.status ===
                                 RefundRequestStatus.Pending && (
                                 <Link
                                    to={`/users/refund-requests/edit/${tableRow.refundID}`}
                                 >
                                    <Tooltip title="Edit">
                                       <IconButton variant="text">
                                          <FontAwesomeIcon
                                             className="h-4 w-4"
                                             icon={faPencil}
                                          />
                                       </IconButton>
                                    </Tooltip>
                                 </Link>
                              )}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </CardBody>
         <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button variant="outlined" size="sm">
               Previous
            </Button>
            <div className="flex items-center gap-2">
               <IconButton variant="outlined" size="sm">
                  1
               </IconButton>
               <IconButton variant="text" size="sm">
                  2
               </IconButton>
               <IconButton variant="text" size="sm">
                  3
               </IconButton>
               <IconButton variant="text" size="sm">
                  ...
               </IconButton>
               <IconButton variant="text" size="sm">
                  8
               </IconButton>
               <IconButton variant="text" size="sm">
                  9
               </IconButton>
               <IconButton variant="text" size="sm">
                  10
               </IconButton>
            </div>
            <Button variant="outlined" size="sm">
               Next
            </Button>
         </CardFooter>
      </Card>
   );
}
