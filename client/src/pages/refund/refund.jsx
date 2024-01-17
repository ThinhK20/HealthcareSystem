import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
   Card,
   CardHeader,
   CardContent,
   Avatar,
   Typography,
   CardMedia,
   CardActions,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import LoadingWrapper from "../../components/loading/loading";
import { detailPolicy, getAll } from "../../apis/insurancePoliciesApis";
import { getAllRefundDetailsByRefundIdApi } from "../../apis/refundDetailApis";
import { formatMoney } from "../../helpers/dataHelper";
import { getInsurancedetails } from "../../apis/accountApis";

function Refund() {
   const maskStyle = {
      maskType: "luminance",
   };

   const [loading, setLoading] = useState(false);
   const [currency, setCurrency] = useState();
   const [refundDetails, setRefundDetails] = useState([]);
   const [packagePolicy, setPackagePolicy] = useState();
   const [Total, setTotal] = useState(0);
   const [price, setPrice] = useState();
   const { id: refundId } = useParams();

   const [selectedPolicy, setSelectedUserPolicy] = useState();
   const [data, setData] = useState();
   const onChangePolicy = (event) => {
      event.preventDefault();
      console.log(event.target.value);
      setSelectedUserPolicy(event.target.value);
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(100000)
   };
   const getPolicy = async () => {
      setLoading(true);
      const dataPackages = await getAll();
      console.log(dataPackages);
      setData(dataPackages);
      setLoading(false);
   };
   const handleCal = (e) => {
      setCurrency(()=>e.target.value)
      if (e.target.value.toString() === "") {
         setTotal(0);
      } 
      else if (price.maxRefundPerExamination == -1) {
         setTotal(e.target.value * price.payoutPrice);
      } else if (price.maxRefundPerExamination >= e.target.value) {
         setTotal(e.target.value * price.payoutPrice);
      } else {
         setTotal(price.maxRefundPerExamination * price.payoutPrice);
      }
   };
   const getDetail = async () => {
      await detailPolicy(packagePolicy?.packageid, selectedPolicy).then((result) => {
         setPrice(result);
         console.log(result);
      });
   };
   useEffect(() => {
      getInsurancedetails(localStorage.getItem("accountId")).then(result=>setPackagePolicy(result.listPackage[0].policyPackage))

      getPolicy();
   }, []);
   useEffect(() => {
      getDetail();
   }, [selectedPolicy]);

   return (
      <>
         <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
            <section className="mb-20 text-gray-800">
               <div className="block rounded-lg shadow-lg bg-white">
                  <div className="flex flex-col">
                     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                           <div className="overflow-hidden">
                              <form onSubmit={handleSubmit} method="POST">
                                 <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 border-t border-l border-r">
                                       <div className="mt-5">
                                          <div className="w-full text-center">
                                             <Typography
                                                fontSize={30}
                                                fontWeight={600}
                                                className="text-[#1A1446]  w-fit py-[20px]  text-center w-full "
                                             >
                                                Form điền thông tin X
                                             </Typography>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="border-b border-gray-900/10 pb-12 pl-28 border-t border-l border-r pt-6">
                                       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                          <div className="sm:col-span-3">
                                             <label
                                                for="countries"
                                                className="block mb-2 text-sm font-medium text-gray-900 da:text-white"
                                             >
                                                Current Package:
                                             </label>
                                             <input
                                                disabled
                                                id="Packages"
                                                value={`${packagePolicy?.name}`}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 da:bg-gray-700 da:border-gray-600 da:placeholder-gray-400 da:text-white da:focus:ring-blue-500 da:focus:border-blue-500"
                                             ></input>
                                          </div>
                                       </div>
                                       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                          <div className="sm:col-span-3">
                                             <label
                                                for="countries"
                                                className="block mb-2 text-sm font-medium text-gray-900 da:text-white"
                                             >
                                                Select a policy
                                             </label>
                                             <select
                                                onChange={onChangePolicy}
                                                value={selectedPolicy}
                                                id="countries"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 da:bg-gray-700 da:border-gray-600 da:placeholder-gray-400 da:text-white da:focus:ring-blue-500 da:focus:border-blue-500"
                                             >
                                                <option selected>
                                                   Choose a country
                                                </option>

                                                {data?.map((item) => (
                                                   <option
                                                      key={item.policyID}
                                                      value={item.policyID}
                                                   >
                                                      {item.name} -{" "}
                                                      {item.description}
                                                   </option>
                                                ))}
                                             </select>
                                          </div>
                                       </div>
                                       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                          {price?.payoutPrice > 0 && (
                                             <>
                                                <div className="sm:col-span-3">
                                                   <label
                                                      for="countries"
                                                      className="block mb-2 text-sm font-medium text-gray-900 da:text-white"
                                                   >
                                                      Percentage reduction ={" "}
                                                      {price?.payoutPrice}
                                                   </label>
                                                </div>
                                                <div className="sm:col-span-3">
                                                   <label className="block mb-2 text-sm font-medium text-gray-900 da:text-white">
                                                      Maximum price reduced ={" "}
                                                      {
                                                         price?.maxRefundPerExamination
                                                      }
                                                   </label>
                                                </div>
                                             </>
                                          )}
                                       </div>
                                       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                          <div className="sm:col-span-3">
                                             <label
                                                for="country"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                             >
                                                Currency
                                             </label>
                                             <div className="mt-2">
                                                <div className="flex items-center">
                                                   <button
                                                      id="dropdown-phone-button"
                                                      data-dropdown-toggle="dropdown-phone"
                                                      className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 da:bg-gray-700 da:hover:bg-gray-600 da:focus:ring-gray-700 da:text-white da:border-gray-600"
                                                      type="button"
                                                   >
                                                      VND{" "}
                                                   </button>
                                                   <div
                                                      id="dropdown-phone"
                                                      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-52 da:bg-gray-700"
                                                   >
                                                      <ul
                                                         className="py-2 text-sm text-gray-700 da:text-gray-200"
                                                         aria-labelledby="dropdown-phone-button"
                                                      >
                                                         <li>
                                                            <button
                                                               type="button"
                                                               className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 da:text-gray-200 da:hover:bg-gray-600 da:hover:text-white"
                                                               role="menuitem"
                                                            >
                                                               <div className="inline-flex items-center">
                                                                  <svg
                                                                     fill="none"
                                                                     aria-hidden="true"
                                                                     className="h-4 w-4 me-2"
                                                                     viewBox="0 0 20 15"
                                                                  >
                                                                     <rect
                                                                        width="19.6"
                                                                        height="14"
                                                                        y=".5"
                                                                        fill="#fff"
                                                                        rx="2"
                                                                     />
                                                                     <mask
                                                                        id="a"
                                                                        style={
                                                                           maskStyle
                                                                        }
                                                                        width="20"
                                                                        height="15"
                                                                        x="0"
                                                                        y="0"
                                                                        maskUnits="userSpaceOnUse"
                                                                     >
                                                                        <rect
                                                                           width="19.6"
                                                                           height="14"
                                                                           y=".5"
                                                                           fill="#fff"
                                                                           rx="2"
                                                                        />
                                                                     </mask>
                                                                     <g mask="url(#a)">
                                                                        <path
                                                                           fill="#D02F44"
                                                                           fill-rule="evenodd"
                                                                           d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                                                           clip-rule="evenodd"
                                                                        />
                                                                        <path
                                                                           fill="#46467F"
                                                                           d="M0 .5h8.4v6.533H0z"
                                                                        />
                                                                        <g filter="url(#filter0_d_343_121520)">
                                                                           <path
                                                                              fill="url(#paint0_linear_343_121520)"
                                                                              fill-rule="evenodd"
                                                                              d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                                                              clip-rule="evenodd"
                                                                           />
                                                                        </g>
                                                                     </g>
                                                                     <defs>
                                                                        <linearGradient
                                                                           id="paint0_linear_343_121520"
                                                                           x1=".933"
                                                                           x2=".933"
                                                                           y1="1.433"
                                                                           y2="6.1"
                                                                           gradientUnits="userSpaceOnUse"
                                                                        >
                                                                           <stop stop-color="#fff" />
                                                                           <stop
                                                                              offset="1"
                                                                              stop-color="#F0F0F0"
                                                                           />
                                                                        </linearGradient>
                                                                        <filter
                                                                           id="filter0_d_343_121520"
                                                                           width="6.533"
                                                                           height="5.667"
                                                                           x=".933"
                                                                           y="1.433"
                                                                           colorInterpolationFilters="sRGB"
                                                                           filterUnits="userSpaceOnUse"
                                                                        >
                                                                           <feFlood
                                                                              flood-opacity="0"
                                                                              result="BackgroundImageFix"
                                                                           />
                                                                           <feColorMatrix
                                                                              in="SourceAlpha"
                                                                              result="hardAlpha"
                                                                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                           />
                                                                           <feOffset dy="1" />
                                                                           <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                           <feBlend
                                                                              in2="BackgroundImageFix"
                                                                              result="effect1_dropShadow_343_121520"
                                                                           />
                                                                           <feBlend
                                                                              in="SourceGraphic"
                                                                              in2="effect1_dropShadow_343_121520"
                                                                              result="shape"
                                                                           />
                                                                        </filter>
                                                                     </defs>
                                                                  </svg>
                                                                  VND
                                                               </div>
                                                            </button>
                                                         </li>
                                                      </ul>
                                                   </div>

                                                   <div className="relative w-full">
                                                      {price?.payoutPrice > 0?(

                                                      <input
                                                  
                                                         type="number"
                                                         id="phone-input"
                                                         className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 da:bg-gray-700 da:border-s-gray-700  da:border-gray-600 da:placeholder-gray-400 da:text-white da:focus:border-blue-500"
                                                         placeholder="123456789"
                                                         value={currency}
                                                         onChange={(e) =>
                                                            handleCal(e)
                                                         }
                                                         required
                                                      />
                                                      ):(
                                                         <input
                                                         disabled
                                                         type="number"
                                                         id="phone-input"
                                                         className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 da:bg-gray-700 da:border-s-gray-700  da:border-gray-600 da:placeholder-gray-400 da:text-white da:focus:border-blue-500"
                                                         placeholder="123456789"
                                                         value={currency}
                                                         onChange={(e) =>
                                                            handleCal(e)
                                                         }
                                                         required
                                                      />
                                                      )}
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       {Total > 0 && (
                                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                             <div className="sm:col-span-3">
                                                <label
                                                   for="countries"
                                                   className="block mb-2 text-sm font-bold text-[red] text-[22px]"
                                                >
                                                   Refund Fee = {Total}
                                                </label>
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                 </div>

                                 <div className="mt-6 flex items-center justify-end gap-x-6 justify-center pb-5">
                                    <button
                                       type="button"
                                       className="text-sm font-semibold leading-6 text-gray-900"
                                    >
                                       Cancel
                                    </button>
                                    <button
                                       type="submit"
                                       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                       Save
                                    </button>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            {/* Table */}
            <table className="min-w-full text-left text-sm font-light">
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
         </div>

         <ToastContainer />
         <LoadingWrapper open={loading} />
      </>
   );
}

export default Refund;
