import { useState, useEffect } from "react";
import RowTableStaffsPayment from "../../components/staffs/RowPayment";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getPaymentsByAccountID } from "../../apis/paymentApis";
import LoadingData from "../../components/loading/loadingData";
import { Input } from "@material-tailwind/react";
import Paging from "../../components/pagination/pagination";
import { jwtDecode } from "jwt-decode";
const CustomersPayment = () => {
   const [filteredPayments, setFilteredPayments] = useState([]);
   const [payments, setPayments] = useState([]);
   const [searchValue, setSearchValue] = useState("");
   const [status, setStatus] = useState(1);
   const [filterByPaymentId, setFilterByPaymentId] = useState(false);
   const [filterByRequestId, setFilterByRequestId] = useState(false);
   const [currentRole, setCurrentRole] = useState("");
   const [data, setData] = useState();
   const itemsPerPage = 5;
   const handlePageChange = (newPage) => {
      const startIndex = (newPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setData(filteredPayments.slice(startIndex, endIndex));
   };
   const findOrders = (value) => {
      setSearchValue(value);
   };
   const filterStatus = () => {
      if (status === 2) {
         setStatus(0);
         setFilteredPayments(payments.filter((item) => item.status === false));
      } else {
         setStatus(status + 1);
         if (status === 1) {
            setFilteredPayments(
               payments.filter((item) => item.status === true)
            );
         } else {
            setFilteredPayments(payments);
         }
      }
   };

   function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
   }

   const fetchPayments = async () => {
      const tokenValue = getCookie("token")
      const accountId = localStorage.getItem("accountId")
      getPaymentsByAccountID(accountId).then((response) => {
         setPayments(response);
         setFilteredPayments(response);
         setData(response.slice(0, 5));
      });
   };
   useEffect(() => {
      fetchPayments();
   }, []);

   useEffect(() => {
      const searchLower = searchValue?.toLowerCase() || "";
      const filteredPayments = payments.filter((item) => {
         const matchesSearch =
            item.requestId.toString().toLowerCase().includes(searchLower) ||
            item.paymentId.toString().toLowerCase().includes(searchLower);

         const matchesFilter =
            (!filterByPaymentId ||
               item.paymentId.toString().toLowerCase().includes(searchLower)) &&
            (!filterByRequestId ||
               item.requestId.toString().toLowerCase().includes(searchLower));

         return matchesSearch && matchesFilter;
      });
      setFilteredPayments(filteredPayments);
   }, [searchValue, filterByPaymentId, filterByRequestId]);

   return (
      <>
         <div className="w-[100%]">
            <div className=" h-[80px] border-solid border-[black] border-b-[2px] flex justify-between">
               <div className="h-[80px]  text-[24px] font-[600] mt-[10px] ml-[20px]">
                  List User
               </div>
               <div className="p-[20px] hidden md:block">
                  <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3 mr-[50px]">
                     <button
                        type="button"
                        className="flex bg-gray-300 items-center justify-center px-4 py-2 border-[1px] hover:bg-gray-100 text-sm font-medium text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dbg-primary-600 dhover:bg-primary-700 focus:outline-none dfocus:ring-primary-800"
                     >
                        <svg
                           className="h-3.5 w-3.5 mr-2"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                           aria-hidden="true"
                        >
                           <path
                              clipRule="evenodd"
                              fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                           />
                        </svg>
                        Add new user
                     </button>

                     <button
                        type="button"
                        className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-gray-300 border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dfocus:ring-gray-700 dbg-gray-800 dtext-gray-400 dborder-gray-600 dhover:text-white dhover:bg-gray-700"
                     >
                        <svg
                           className="w-4 h-4 mr-2"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth="2"
                           stroke="currentColor"
                           aria-hidden="true"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                           />
                        </svg>
                        Export
                     </button>
                  </div>
               </div>
            </div>
            <div className="bg-[white] h-[calc(100%_-_180px)]">
               <section className="bg-white dbg-gray-900 py-3 sm:py-5">
                  <div className="px-4 mx-auto max-w-screen-2xl lg:px-12 mt-[10px]">
                     <div className="relative overflow-hidden bg-white shadow-md dbg-gray-800 ">
                        <div className="h-[40px] w-[500px] mb-[20px]">
                           {/* <input
                    type="text"
                    placeholder="Enter Find Payments By AccountID,Username or Phone"
                    value={searchValue}
                    onChange={(e) => findOrders(e.target.value)}
                    className="p-[5px] h-[40px] w-[500px] bg-gray-200 rounded-[10px] border-[1px] border-[gray]"
                  /> */}
                           <div className="flex w-full shrink-0 gap-2 md:w-max p-2">
                              <div className="w-full md:w-72">
                                 <Input
                                    label="Search"
                                    icon={
                                       <MagnifyingGlassIcon className="h-5 w-5" />
                                    }
                                    placeholder="Enter Text"
                                    value={searchValue}
                                    onChange={(e) => findOrders(e.target.value)}
                                 />
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                           <label className="flex items-center">
                              <input
                                 type="checkbox"
                                 checked={filterByPaymentId}
                                 onChange={() =>
                                    setFilterByPaymentId(!filterByPaymentId)
                                 }
                                 className="mr-2"
                              />
                              Payment ID
                           </label>
                           <label className="flex items-center">
                              <input
                                 type="checkbox"
                                 checked={filterByRequestId}
                                 onChange={() =>
                                    setFilterByRequestId(!filterByRequestId)
                                 }
                                 className="mr-2"
                              />
                              Request ID
                           </label>
                        </div>

                        <div className="overflow-x-auto">
                           {filteredPayments?.length > 0 ? (
                              <table className="w-full text-sm text-left text-gray-500 dtext-gray-400">
                                 <thead className="text-xs text-gray-700 uppercase bg-gray-200 dbg-gray-700 dtext-gray-400">
                                    <tr>
                                       <th
                                          scope="col"
                                          className="px-4 py-3 w-[200px]"
                                       >
                                          Payment ID
                                       </th>
                                       <th
                                          scope="col"
                                          className="px-4 py-3 w-[200px]"
                                       >
                                          Request ID
                                       </th>
                                       <th
                                          scope="col"
                                          className="px-4 py-3 w-[200px]"
                                       >
                                          Customer ID
                                       </th>
                                       <th scope="col" className="px-4 py-3">
                                          Created Date
                                       </th>
                                       <th scope="col" className="px-4 py-3">
                                          <div className="w-[100%] flex justify-end">
                                             Paymented Date
                                          </div>
                                       </th>
                                       <th
                                          scope="col"
                                          className="px-4 py-3 w-[280px]"
                                       >
                                          <div className="w-[100%] flex justify-end">
                                             <div className=" mr-[20px]">
                                                Price
                                             </div>
                                          </div>
                                       </th>
                                       <th
                                          scope="col"
                                          className="px-4 py-3 flex justify-center"
                                       >
                                          <button
                                             onClick={filterStatus}
                                             className="flex justify-center items-center"
                                          >
                                             <FunnelIcon className="h-6 w-6 text-gray-500" />
                                             <div>Status</div>
                                          </button>
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {data?.map((item) => {
                                       return (
                                          <RowTableStaffsPayment
                                             item={item}
                                             key={item.paymentId}
                                          />
                                       );
                                    })}
                                 </tbody>
                              </table>
                           ) : (
                              <>
                                 <LoadingData></LoadingData>
                              </>
                           )}
                        </div>
                        <div className="w-full flex justify-end pr-[50px]">
                           <Paging
                              totalItems={filteredPayments?.length}
                              itemsPerPage={itemsPerPage}
                              onPageChange={handlePageChange}
                           />
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </div>
      </>
   );
};
export default CustomersPayment;
