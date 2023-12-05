import { PencilIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
   Card,
   CardHeader,
   Typography,
   Button,
   CardBody,
   Chip,
   CardFooter,
   Avatar,
   IconButton,
   Input,
} from "@material-tailwind/react";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAllRefundRequestsApi } from "../../apis/refundRequestApis";
import { toast } from "react-toastify";
import { formatDate, formatNumber } from "../../helpers/dataHelper";
const TABLE_HEAD = [
   "User",
   "Hospital Name",
   "Description",
   "Refund Fee",
   "Date Send",
   "Date Refund",
   "Status",
   "",
];

export function RefundRequestManagement() {
   const [refundRequests, setRefundRequests] = useState();
   const [tableRows, setTableRows] = useState([]);

   useEffect(() => {
      const source = axios.CancelToken.source();
      getAllRefundRequestsApi(source.token)
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
      setTableRows(() => {
         const newRows = refundRequests?.map((request) => ({
            img: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/405226120_1995521290835244_4541343621775144051_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5740b7&_nc_ohc=llvk1mHN0MEAX-X09rK&_nc_ht=scontent.fsgn8-4.fna&cb_e2o_trans=t&oh=00_AfCNK-jrDWbNmf4mBheh79FaqUL8nF7qWOc2B9RfnLk7Rg&oe=65736864",
            user: "Tuan Minh",
            hospitalName: request.hoptitalName,
            description: request.description,
            refundFee: request.totalRefundFee,
            dateSend: request.dateSend,
            dateRefund: request.dateRefund,
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
                     These are details about the refund requests to HealthCare
                     System Company
                  </Typography>
               </div>
               <div className="flex w-full shrink-0 gap-2 md:w-max">
                  <div className="w-full md:w-72">
                     <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                     />
                  </div>
                  <Button size="sm">
                     <Link
                        to={"/users/customer-requests/create"}
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
                                 <Avatar
                                    src={tableRow.img}
                                    alt={tableRow.user}
                                    size="md"
                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                 />
                                 <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                 >
                                    {tableRow.user}
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
                                 className="font-normal"
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
                                 {formatNumber(tableRow.refundFee)}
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
                              <Link
                                 to={`/staff/payment-detal/${tableRow?.requestID}`}
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
                              <Tooltip title="Edit">
                                 <IconButton variant="text">
                                    <PencilIcon className="h-4 w-4" />
                                 </IconButton>
                              </Tooltip>
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
