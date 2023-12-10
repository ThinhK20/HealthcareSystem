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
import { useEffect, useState } from "react";
import { getAllCustomerRequestsApi } from "../../apis/userApis";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const TABLE_HEAD = [
   "User",
   "Staff",
   "Price",
   "Insurance",
   "Status",
   "Payment",
   "",
];

export default function CustomerRequestManagement() {
   const [requestsData, setRequestsData] = useState();
   const [tableRows, setTableRows] = useState([]);

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
      setTableRows(() => {
         const newRows = requestsData?.map((request) => ({
            img: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/326531349_947755589483002_6935008565326110642_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=PJH_vUdCxyAAX9NXJue&_nc_ht=scontent.fsgn8-4.fna&cb_e2o_trans=t&oh=00_AfAClCLAKwfSa5q-4xojAZmk3e1XAhvaLbU1UsJPDzhXfQ&oe=656B7BF1",
            user: request.account,
            staff: request.staff,
            payment: request.payment,
            policyPackage: request.policyPackage,
            periodic: request.periodic,
            requestID : request.requestID
         }));
         return newRows;
      });
   }, [requestsData]);

   return (
      <Card className="h-full w-full">
         <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
               <div>
                  <Typography variant="h5" color="blue-gray">
                     Customer Requests Management
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                     These are details about your customer requests to
                     HEALTIH Solutions Company
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
                                 <Avatar
                                    src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/405951306_320072137500028_6127723524739415292_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=ibticE03VS8AX8vHspU&_nc_ht=scontent.fsgn8-4.fna&cb_e2o_trans=t&oh=00_AfBFaG0mhPAaJlXHdcQlJekioOvRqs43jsoDZhnyu1wx9w&oe=656BD38D"
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
                              <Typography
                                 variant="small"
                                 color="blue-gray"
                                 className="font-normal"
                              >
                                 {tableRow.payment?.price}
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
                                             : tableRow.policyPackage?.name ===
                                                "Premium"
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
                                    value={
                                       tableRow.payment?.status
                                          ? "Paid"
                                          : "Pending"
                                    }
                                    color={
                                       tableRow.payment?.status
                                          ? "green"
                                          : "amber"
                                    }
                                 />
                              </div>
                           </td>
                           <td className={classes}>
                              <div className="flex items-center gap-3">
                                 <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                    <Avatar
                                       src={
                                          "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                          // : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                       }
                                       size="sm"
                                       alt={"Visa"}
                                       variant="square"
                                       className="h-full w-full object-contain p-1"
                                    />
                                 </div>
                                 <div className="flex flex-col">
                                    <Typography
                                       variant="small"
                                       color="blue-gray"
                                       className="font-normal capitalize"
                                    >
                                       {/* {account.split("-").join(" ")}{" "}
                                          {accountNumber} */}
                                       Visa 1234
                                    </Typography>
                                    <Typography
                                       variant="small"
                                       color="blue-gray"
                                       className="font-normal opacity-70"
                                    >
                                       {"06/2025"}
                                    </Typography>
                                 </div>
                              </div>
                           </td>
                           <td className={classes}>
                              <Link to={`/users/payment`}>
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