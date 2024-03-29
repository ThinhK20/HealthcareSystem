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
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAllRefundRequestsApi } from "../../apis/refundRequestApis";
import { toast } from "react-toastify";
import { formatDate, formatMoney } from "../../helpers/dataHelper";
import { RefundRequestStatus } from "../../enums/refund-request-status";
import Paging from "../../components/pagination/pagination";
const TABLE_HEAD = [
   "Id",
   "User",
   "Hospital Name",
   "Description",
   "Expect Fee",
   "Refund Fee",
   "Date Send",
   "Date Refund",
   "Status",
   "",
];

const ITEM_PER_PAGE = 5;

export function RefundRequestManagement() {
   const [refundRequests, setRefundRequests] = useState();
   const [tableRows, setTableRows] = useState([]);
   const [filterTableRows, setFilterTableRows] = useState([]);
   const [searchInput, setSearchInput] = useState("");
   const [isStatus, setIsStatus] = useState(0);

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
      setFilterTableRows(() => {
         return filterTableRowsByStatus(tableRows);
      });
   }, [searchInput, isStatus]);

   function filterTableRowsByStatus(rowsData) {
      switch (isStatus) {
         case 0:
            return rowsData?.filter(
               (r) =>
                  r.user?.username
                     .toLowerCase()
                     .includes(searchInput.toLowerCase()) ||
                  r.hospitalName
                     ?.toLowerCase()
                     .includes(searchInput.toLowerCase())
            );
         case 1:
            return rowsData?.filter((r) => {
               return (
                  r.status === RefundRequestStatus.Approved &&
                  (r.user?.username
                     .toLowerCase()
                     .includes(searchInput.toLowerCase()) ||
                     r.hospitalName
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()))
               );
            });
         case 2:
            return rowsData?.filter(
               (r) =>
                  r.status === RefundRequestStatus.Pending &&
                  (r.user?.username
                     .toLowerCase()
                     .includes(searchInput.toLowerCase()) ||
                     r.hospitalName
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()))
            );
         case 3:
            return rowsData?.filter(
               (r) =>
                  r.status === RefundRequestStatus.Rejected &&
                  (r.user?.username
                     .toLowerCase()
                     .includes(searchInput.toLowerCase()) ||
                     r.hospitalName
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()))
            );
      }
   }

   useEffect(() => {
      const newRows = refundRequests?.map((request) => ({
         img: "https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg",
         user: request.insurance?.account,
         hospitalName: request.hoptitalName,
         description: request.description,
         expectFee: request.totalRefundFee,
         refundFee: request.refundDetails?.reduce((acc, curr) => {
            return acc + curr.refundFee;
         }, 0), 
         dateSend: request.dateSend,
         dateRefund: request.dateRefund,
         status: request.status,
         refundID: request.refundID,
      }));
      setTableRows(() => newRows);
      setFilterTableRows(() => newRows);
   }, [refundRequests]);

   function onFilter() {
      setIsStatus((oldState) => {
         let newState = oldState + 1;
         if (newState >= 4) newState = 0;
         return newState;
      });
   }

   

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
               <div className="flex w-full shrink-0 gap-4 md:w-max z-40">
                  <div
                     onClick={onFilter}
                     className="flex items-center gap-1 py-2 px-4 hover:bg-gray-300 cursor-pointer rounded"
                  >
                     <FontAwesomeIcon icon={faFilter} />
                     <span>Status</span>
                  </div>
                  <div className="w-full md:w-72">
                     <Input
                        onChange={(e) => setSearchInput(e.target.value)}
                        label="Search"
                        placeholder="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                     />
                  </div>
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
                  {filterTableRows?.map((tableRow, index) => {
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
                                 {formatMoney(tableRow.expectFee)}
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
                                       tableRow.status ===
                                       RefundRequestStatus.Approved
                                          ? "green"
                                          : tableRow.status ===
                                            RefundRequestStatus.Pending
                                          ? "amber"
                                          : "red"
                                    }
                                 />
                              </div>
                           </td>
                           <td className={classes}>
                              <Link
                                 to={`/staffs/refund-requests/${tableRow.refundID}`}
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
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </CardBody>
         <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
            <Paging
               itemsPerPage={ITEM_PER_PAGE}
               totalItems={filterTableRowsByStatus(tableRows)?.length}
            />
         </CardFooter>
      </Card>
   );
}
