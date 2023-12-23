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
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAccounts } from "../../apis/accountApis";
import { DeleteAccount } from "../../components/deleteAccount/delete-account";
const TABLE_HEAD = ["Account ", "User", "Username ", "Role", "Status", ""];

export function ManageAccount() {
   const [accounts, setAccount] = useState();
   const [tableRows, setTableRows] = useState([]);

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
   }, [accounts]);

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
                        customers in the system, and here are the details:
                     </Typography>
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
                                    to={`/users/edit-account/${tableRow.accountId}`}
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
                                 {/* <Link
                                    to={`/staffs/refund-requests/${tableRow.status}`}
                                 >
                                    <Tooltip title="View details">
                                       <IconButton variant="text">
                                          <FontAwesomeIcon
                                             className="h-4 w-4"
                                             icon={faPersonCircleCheck}
                                          />
                                       </IconButton>
                                    </Tooltip>
                                 </Link> */}
                                 <DeleteAccount
                                    accountId={tableRow.accountId}
                                 />
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
      </div>
   );
}
