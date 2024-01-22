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
   Select,
} from "@material-tailwind/react";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faDollar,
   faEye,
   faFilter,
   faPencil,
   faUser,
   faFile
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAccounts } from "../../apis/accountApis";
import { DeleteAccount } from "../../components/deleteAccount/delete-account";
import LoadingData from "../../components/loading/loadingData";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Paging from "../../components/pagination/pagination";

const TABLE_HEAD = ["Account ", "User", "Username ", "Role", "Status", ""];
const ITEM_PER_PAGE = 5;
export function ManageAccount() {
   const [accounts, setAccount] = useState();
   const [tableRows, setTableRows] = useState([]);
   const [filterTableRows, setFilterTableRows] = useState([]);
   const [searchInput, setSearchInput] = useState("");
   const [isStatus, setIsStatus] = useState(0);
   const [paginationIndex, setPaginationIndex] = useState({
      startIndex: 0,
      endIndex: ITEM_PER_PAGE,
   });

   useEffect(() => {
      getAccounts().then((result) => setAccount(result));
   }, []);

   useEffect(() => {
      setTableRows(() => {
         const newRows = accounts?.map((account) => ({
            img: "https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg",
            accountId: account.accountId,
            userId: account.userId,
            username: account.username,
            status: account.status,
            role: account.role,
         }));
         return newRows;
      });
      setFilterTableRows(() => {
         const newRows = accounts?.map((account) => ({
            img: "https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg",
            accountId: account.accountId,
            userId: account.userId,
            username: account.username,
            status: account.status,
            role: account.role,
         }));
         return newRows?.slice(0, ITEM_PER_PAGE);
      });
   }, [accounts]);

   useEffect(() => {
      setFilterTableRows(() => {
         return filterTableRowsByStatus(tableRows, true);
      });
   }, [searchInput, isStatus, paginationIndex]);

   function onFilter() {
      setIsStatus((oldState) => {
         let newState = oldState + 1;
         if (newState >= 3) newState = 0;
         return newState;
      });
   }

   function filterTableRowsByStatus(rowsData, isPaging = false) {
      switch (isStatus) {
         case 0:
            return !isPaging
               ? rowsData?.filter((r) =>
                    r.username.toLowerCase().includes(searchInput.toLowerCase())
                 )
               : rowsData
                    ?.filter((r) =>
                       r.username
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                    )
                    ?.slice(
                       paginationIndex.startIndex,
                       paginationIndex.endIndex
                    );
         case 1:
            return !isPaging
               ? rowsData?.filter(
                    (r) =>
                       r.status === "Active" &&
                       r.username
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                 )
               : rowsData
                    ?.filter(
                       (r) =>
                          r.status === "Active" &&
                          r.username
                             .toLowerCase()
                             .includes(searchInput.toLowerCase())
                    )
                    ?.slice(
                       paginationIndex.startIndex,
                       paginationIndex.endIndex
                    );
         case 2:
            return !isPaging
               ? rowsData?.filter(
                    (r) =>
                       r.status === "Deleted" &&
                       r.username
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                 )
               : rowsData
                    ?.filter(
                       (r) =>
                          r.status === "Deleted" &&
                          r.username
                             .toLowerCase()
                             .includes(searchInput.toLowerCase())
                    )
                    ?.slice(
                       paginationIndex.startIndex,
                       paginationIndex.endIndex
                    );
      }
   }

   function onPageChange(newPage) {
      const startIndex = (newPage - 1) * ITEM_PER_PAGE;
      const endIndex = startIndex + ITEM_PER_PAGE;
      setPaginationIndex(() => ({
         startIndex,
         endIndex,
      }));
   }

   return (
      <div className="flex flex-col w-full">
         <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
               <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div>
                     <Typography variant="h5" color="blue-gray">
                        Accounts Management
                     </Typography>
                     <Typography color="gray" className="mt-1 font-normal">
                        There are a total of <strong>{accounts?.length}</strong>{" "}
                        accounts in the system, and here are the details:
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
                           icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                     </div>
                  </div>
               </div>
            </CardHeader>

            <CardBody className=" px-0">
               {filterTableRows?.length > 0 ? (
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
                           const isLast = index === tableRows?.length - 1;
                           const classes = isLast
                              ? "p-4 "
                              : "p-4 border-b border-blue-gray-50 text-center ";

                           return (
                              <tr key={index}>
                                 <td className={classes}>
                                    <div className="flex items-center gap-3">
                                       <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal"
                                       >
                                          {tableRow.accountId}
                                       </Typography>
                                    </div>
                                 </td>
                                 <td className={classes}>
                                    <div className="flex items-center gap-3">
                                       <Avatar
                                          src={tableRow.img}
                                          alt={tableRow.username}
                                          size="md"
                                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                       />
                                       <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal"
                                       >
                                          {tableRow.username}
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
                                          {tableRow.role}
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
                                          {tableRow.role}
                                       </Typography>
                                    </div>
                                 </td>
                                 <td className={classes}>
                                    <div className="w-max">
                                       <Chip
                                          size="sm"
                                          variant="ghost"
                                          value={tableRow.status}
                                          color={
                                             tableRow.status === "Active"
                                                ? "green"
                                                : tableRow.status === "Inactive"
                                                ? "amber"
                                                : "red"
                                          }
                                       />
                                    </div>
                                 </td>
                                 <td className="text-center border-b border-blue-gray-50 ">
                                    <Link
                                       to={`/staffs/refund-requests/${tableRow.status}`}
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
                                    <Link
                                       to={`/staffs/edit-account/${tableRow.accountId}`}
                                    >
                                       <Tooltip title="Edit Account">
                                          <IconButton variant="text">
                                             <FontAwesomeIcon
                                                className="h-4 w-4"
                                                icon={faPencil}
                                             />
                                          </IconButton>
                                       </Tooltip>
                                    </Link>
                                    <Link
                                       to={`/staffs/edit-information/${tableRow.accountId}`}
                                    >
                                       <Tooltip title="Edit Information">
                                          <IconButton variant="text">
                                             <FontAwesomeIcon
                                                className="h-4 w-4"
                                                icon={faUser}
                                             />
                                          </IconButton>
                                       </Tooltip>
                                    </Link>
                                    <Link
                                       to={`/staffs/HealthRecord?id=${tableRow.userId}`}
                                    >
                                       <Tooltip title="View Health Record">
                                          <IconButton variant="text">
                                             <FontAwesomeIcon
                                                className="h-4 w-4"
                                                icon={faFile}
                                             />
                                          </IconButton>
                                       </Tooltip>
                                    </Link>
                                    <Link
                                       to={`/staffs/payment?acc=${tableRow.accountId}`}
                                    >
                                       <Tooltip title="Payment">
                                          <IconButton variant="text">
                                             <FontAwesomeIcon
                                                className="h-4 w-4"
                                                icon={faDollar}
                                             />
                                          </IconButton>
                                       </Tooltip>
                                    </Link>
                                    <DeleteAccount
                                       accountId={tableRow.accountId}
                                    />
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
                  totalItems={filterTableRowsByStatus(tableRows)?.length}
                  itemsPerPage={ITEM_PER_PAGE}
                  onPageChange={onPageChange}
               />
            </CardFooter>
         </Card>
      </div>
   );
}
