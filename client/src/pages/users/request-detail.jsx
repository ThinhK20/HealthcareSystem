import { useState, useEffect } from "react";
import { formatDate, formatMoney } from "../../helpers/dataHelper";
import { Button, Typography } from "@material-tailwind/react";
import {
   faChevronDown,
   faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@material-tailwind/react";
import { getCustomerRequestByIdApi } from "../../apis/customerRequestApis";
import { getPaymentsByID } from "../../apis/paymentApis";
import { Link, useParams } from "react-router-dom";
import ButtonStepper from "../../components/card/news";
import { RequestStatus } from "../../enums/refund-request-status";

const UserRequestDetail = () => {
   const [data, setData] = useState();
   const [dropPayment, SetDropPaymet] = useState(false);
   const [paymentDetail, setPaymentDetail] = useState(null);
   const { id } = useParams();
   useEffect(() => {
      getCustomerRequestByIdApi(id)
         .then((result) => {
            setData(result);
            getPaymentsByID(result.requestID)
               .then((request) => {
                  setPaymentDetail(request);
               })
               .catch((error) => {
                  console.error("Error fetching payment details:", error);
               });
         })
         .catch((error) => {
            console.error("Error fetching customer requests:", error);
         });
   }, []);
   // const handComplete = () => {
   //   axios
   //     .post(`https://localhost:44384/api/users/CompleteRequest/${id}`)
   //     .then(handleReset);
   // };
   const handleDropPaymet = () => {
      SetDropPaymet(!dropPayment);
   };
   return (
      <>
         <div className="bg-gray-50 dr:bg-slate-900 w-full">
            <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
               <div className="sm:w-11/12 lg:w-3/4 mx-auto">
                  <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dr:bg-gray-800">
                     <div className="flex justify-between">
                        <div>
                           <svg
                              className="w-10 h-10"
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12"
                                 className="stroke-blue-600 dr:strokewhite"
                                 stroke="currentColor"
                                 strokeWidth="2"
                              />
                              <path
                                 d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12"
                                 className="stroke-blue-600 dr:strokewhite"
                                 stroke="currentColor"
                                 strokeWidth="2"
                              />
                              <circle
                                 cx="13"
                                 cy="13.0214"
                                 r="5"
                                 fill="currentColor"
                                 className="fill-blue-600 dr:fill-white"
                              />
                           </svg>
                           <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dr:text-white">
                              Preline Inc.
                           </h1>
                        </div>
                        <div className="text-end">
                           <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dr:text-gray-200">
                              Customer Request #{data?.requestID}
                           </h2>
                           <span className="mt-1 flex items-center gap-2 text-gray-500 inline-block" >
                              Status:
                              <Chip
                                    size="sm"
                                    variant="ghost"
                                  
                                    value={data?.status}
                                    color={
                                       data?.status === RequestStatus.Confirmation
                                       ? "amber" 
                                       : data?.status === RequestStatus.Transfer ? "blue" : 
                                       data?.status === RequestStatus.Completed ? "purple" : "red"
                                    }
                                 />
                           </span>
                           <div className="mt-4 not-italic text-gray-800 dr:text-gray-200"></div>
                        </div>
                     </div>

                     <div className="mt-8 grid sm:grid-cols-2 gap-3">
                        <div>
                           <h3 className="text-lg font-semibold text-gray-800 dr:text-gray-200">
                              Username request: {data?.account?.username}
                           </h3>
                           <span className="text-lg font-semibold text-gray-800 dr:text-gray-200"></span>
                           <div className="mt-2 not-italic text-gray-500">
                              Confirmation staff : #{data?.staff?.accountId}
                           </div>
                        </div>
                        <div className="sm:text-end space-y-2">
                           <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                              <dl className="grid sm:grid-cols-5 gap-x-3">
                                 <dt className="col-span-3 font-semibold text-gray-800 dr:text-gray-200">
                                    Request Date :
                                 </dt>
                                 <dd className="col-span-2 text-gray-500">
                                    {formatDate(data?.expirationDate)}
                                 </dd>
                              </dl>
                              <dl className="grid sm:grid-cols-5 gap-x-3">
                                 <dt className="col-span-3 font-semibold text-gray-800 dr:text-gray-200">
                                    Accept Date :
                                 </dt>
                                 <dd className="col-span-2 text-gray-500">
                                    {formatDate(data?.dateAccept)}
                                 </dd>
                              </dl>
                           </div>
                        </div>
                     </div>
                     <Typography
                        variant="small"
                        color="blue-gray"
                        className="mt-[30px] font-[700] leading-none opacity-70"
                     >
                        Package Request
                     </Typography>
                     <>
                        <div className="transition-max-height duration-1000 ease-in-out overflow-hidden ">
                           <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                              <div className="hidden sm:grid sm:grid-cols-4">
                                 <div className="sm:col-span text-xs font-medium text-gray-500 uppercase">
                                    Package ID
                                 </div>
                                 <div className="text-xs font-medium text-gray-500 uppercase text-center">
                                    Name{" "}
                                 </div>
                                 <div className="text-center w-full text-xs font-medium text-gray-500 uppercase col-span-2">
                                    Description
                                 </div>
                              </div>
                              <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                 <div className="sm:col-span text-xs font-medium text-gray-500  uppercase">
                                    Package #{data?.policyPackage?.packageid}
                                 </div>
                                 <div className="text-center text-xs font-medium text-gray-500 uppercase px-[40px]">
                                    <Chip
                                       size="sm"
                                       variant="ghost"
                                       value={data?.policyPackage?.name}
                                       color={
                                          data?.policyPackage?.name === "Basic"
                                             ? "green"
                                             : data?.policyPackage?.name ===
                                               "Premium"
                                             ? "amber"
                                             : "blue"
                                       }
                                    />
                                 </div>
                                 <div className="pl-[30px] text-start w-full text-xs font-medium text-gray-500 uppercase col-span-2">
                                    {data?.policyPackage?.description}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </>
                     <Button
                        onClick={handleDropPaymet}
                        className="w-full h-[30px] mt-6 bg-[white] text-[black] p-[3px]"
                     >
                        <span className="mr-[5px]">Payment</span>
                        {dropPayment ? (
                           <FontAwesomeIcon
                              icon={faChevronDown}
                           ></FontAwesomeIcon>
                        ) : (
                           <FontAwesomeIcon
                              icon={faChevronRight}
                           ></FontAwesomeIcon>
                        )}
                     </Button>
                     {dropPayment && (
                        <>
                           <div className="transition-max-height duration-1000 ease-in-out overflow-hidden ">
                              <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                                 <div className="hidden sm:grid sm:grid-cols-5">
                                    <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                                       Payment ID
                                    </div>
                                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                       Price
                                    </div>
                                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                       Transfer date
                                    </div>
                                    <div className="text-end text-xs font-medium text-gray-500 uppercase">
                                       Status
                                    </div>
                                 </div>
                                 <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>

                                 {paymentDetail?.map((payment) => (
                                    <div
                                       key={payment.paymentId}
                                       className="sm:grid sm:grid-cols-5"
                                    >
                                       {/* Item (You can customize this based on your data) */}
                                       <div className="sm:col-span-2">{`Payment ${payment.paymentId}`}</div>

                                       {/* Qty (You can customize this based on your data) */}
                                       <div className="text-start">
                                          {formatMoney(payment.price)}
                                       </div>

                                       {/* Rate (You can customize this based on your data) */}
                                       <div className="text-start">
                                          {formatDate(payment.updatedDate)}
                                       </div>

                                       {/* Amount (You can customize this based on your data) */}
                                       <div className="text-center">
                                          <Chip
                                             size="sm"
                                             variant="ghost"
                                             value={
                                                payment?.status
                                                   ? "Paid"
                                                   : "Pending"
                                             }
                                             color={
                                                payment?.status
                                                   ? "green"
                                                   : "amber"
                                             }
                                          />
                                       </div>
                                    </div>
                                 ))}
                                 <div className="w-full flex justify-end my-[30px]">
                                    <Link
                                       to={`/staffs/payment?acc=${data?.staff?.accountId}`}
                                       className="hover:underline hover:to-blue-800"
                                       color="blue"
                                    >
                                       {" "}
                                       View All Transaction{" "}
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </>
                     )}

                     <div className="mt-8 flex sm:justify-end">
                        <div className="w-full max-w-2xl sm:text-end space-y-2">
                           <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2"></div>
                        </div>
                     </div>
                     <ButtonStepper item={data?.status} />
                     <div className="mt-8 sm:mt-12">
                        <h4 className="text-lg font-semibold text-gray-800 dr:text-gray-200">
                           Thank you!
                        </h4>
                        <p className="text-gray-500">
                           If you have any questions concerning this invoice,
                           use the following contact information:
                        </p>
                        <div className="mt-2">
                           <p className="block text-sm font-medium text-gray-800 dr:text-gray-200">
                              example@site.com
                           </p>
                           <p className="block text-sm font-medium text-gray-800 dr:text-gray-200">
                              +1 (062) 109-9222
                           </p>
                        </div>
                     </div>

                     <p className="mt-5 text-sm text-gray-500">
                        © 2022 Preline.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
export default UserRequestDetail;
