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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getAllCustomerRequestsApi } from "../../apis/customerRequestApis";
import { formatMoney } from "../../helpers/dataHelper";
import LoadingData from "../../components/loading/loadingData";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Paging from "../../components/pagination/pagination";
import { RequestStatus } from "../../enums/refund-request-status";


const TABLE_HEAD = [
   "Request Id",
   "User",
   "Staff",
   "Price",
   "Insurance",
   "Status",
   "",
];

const ITEMS_PER_PAGE = 3;
export default function StaffCustomerRequestManagement() {
   const [requestsData, setRequestsData] = useState();
   const [tableRows, setTableRows] = useState([]);
   const [tableRowsFilter, setTableRowsFilter] = useState(tableRows);
   const [searchInput, setSearchInput] = useState("");
   const [paginationIndex, setPaginationIndex] = useState({
      startIndex: 0,
      endIndex: ITEMS_PER_PAGE,
   });

   useEffect(() => {
      const source = axios.CancelToken.source();
      getAllCustomerRequestsApi(source.token)
         .then((res) => {
            setRequestsData(res.data);
         })
         .catch((e) => {
            toast(e);
         });

      return () => {
         source.cancel();
      };
   }, []);

   useEffect(() => {
      setTableRowsFilter(() =>
         filterTableRows(tableRows)?.slice(
            paginationIndex.startIndex,
            paginationIndex.endIndex
         )
      );
   }, [searchInput, paginationIndex]);

   function filterTableRows(rowsData) {
      return rowsData?.filter(
         (r) =>
            r?.user?.username
               ?.toLowerCase()
               ?.includes(searchInput?.toLowerCase()) ||
            r?.staff?.username
               ?.toLowerCase()
               ?.includes(searchInput?.toLowerCase())
      );
   }

   useEffect(() => {
      const newRows = requestsData?.map((request) => ({
         img: "https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg",
         user: request.account,
         staff: request.staff,
         payment: request.payment,
         policyPackage: request.policyPackage,
         periodic: request.periodic,
         requestID: request.requestID,
         price: request.price,
         status: request.status,
      }));
      setTableRows(() => newRows);
      setTableRowsFilter(() => newRows?.slice(0, ITEMS_PER_PAGE));
   }, [requestsData]);

   function onPageChange(newPage) {
      const startIndex = (newPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setPaginationIndex(() => ({
         startIndex,
         endIndex,
      }));
   }

   console.log("Dataadasd: ", tableRowsFilter);

   return (
      <Card className="h-full w-full">
         <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4  w-full ">
               <div>
                  <Typography variant="h5" color="blue-gray">
                     Customer Requests Management
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                     These are details about your customer requests to HEALTIH
                     Solutions Company
                  </Typography>
                  <div className="flex w-full shrink-0 gap-2 justify-end">
                     <div className="w-full md:w-72">
                        <Input
                           onChange={(e) => setSearchInput(e.target.value)}
                           label="Search"
                           value={searchInput}
                           icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </CardHeader>
         <CardBody className="overflow-scroll px-0">
            {tableRows?.length > 0 ? (
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
                     {tableRowsFilter?.map((tableRow, index) => {
                        const isLast = index === tableRows.length - 1;
                        const classes = isLast
                           ? "p-4"
                           : "p-4 border-b border-blue-gray-50";

                        return (
                           <tr key={index}>
                              <td className={classes}>
                                 <div className="flex items-center  gap-3">
                                    <Typography
                                       variant="small"
                                       color="blue-gray"
                                       className="font-bold"
                                    >
                                       {tableRow.requestID}
                                    </Typography>
                                 </div>
                              </td>
                              <td className={classes}>
                                 <div className="flex items-center gap-3">
                                    <Avatar
                                       src={tableRow.img}
                                       alt={tableRow.user.username}
                                       size="md"
                                       className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                    />
                                    <Typography
                                       variant="small"
                                       color="blue-gray"
                                       className="font-bold"
                                    >
                                       {tableRow.user.username}
                                    </Typography>
                                 </div>
                              </td>
                              <td className={classes}>
                                 <div className="flex items-center gap-3">
                                    {tableRow?.staff && (
                                       <>
                                          <Avatar
                                             src="https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg"
                                             alt={tableRow.user.username}
                                             size="md"
                                             className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                          />
                                          <Typography
                                             variant="small"
                                             color="blue-gray"
                                             className="font-bold"
                                          >
                                             {tableRow.staff?.username}
                                          </Typography>
                                       </>
                                    )}
                                 </div>
                              </td>

                              <td className={classes}>
                                 <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                 >
                                    {formatMoney(tableRow.price)}
                                 </Typography>
                              </td>
                              <td className={classes}>
                                 <Tooltip
                                    title={tableRow.policyPackage?.description}
                                 >
                                    <div className="w-max">
                                       <Chip
                                          size="sm"
                                          variant="ghost"
                                          value={tableRow.policyPackage?.name}
                                          color={
                                             tableRow.policyPackage?.name ===
                                             "Basic"
                                                ? "green"
                                                : tableRow.policyPackage
                                                     ?.name === "Premium"
                                                ? "amber"
                                                : "blue"
                                          }
                                       />
                                    </div>
                                 </Tooltip>
                              </td>
                              <td className={classes}>
                                 <div className="w-max">
                                    <Chip
                                       size="sm"
                                       variant="ghost"
                                       value={tableRow.status}
                                       color={
                                          tableRow.status === RequestStatus.Confirmation
                                             ? "amber" 
                                             : tableRow.status === RequestStatus.Transfer ? "blue" : 
                                             tableRow.status === RequestStatus.Completed ? "purple" : "red"
                                       }
                                    />
                                 </div>
                              </td>
                              <td className={classes}>
                                 <Link to={`/staffs/payment?acc=${tableRow?.user?.accountId}`}>
                                    <Tooltip title="View payment details">
                                       <IconButton variant="text">
                                          <FontAwesomeIcon
                                             className="h-4 w-4"
                                             icon={faMoneyBill}
                                          />
                                       </IconButton>
                                    </Tooltip>
                                 </Link>

                                 <Link
                                    to={`/staffs/request-detail/${tableRow.requestID}`}
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
            ) : (
               <>
                  <LoadingData></LoadingData>
               </>
            )}
         </CardBody>
         <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
            <Paging
               totalItems={filterTableRows(tableRows)?.length}
               itemsPerPage={ITEMS_PER_PAGE}
               onPageChange={onPageChange}
            />
         </CardFooter>
      </Card>
   );
}
