import { useState, useEffect } from "react";
import RowTableUserPayment from "../../components/user/RowPayment";
import RowTableUserWaitingPayment from "../../components/user/RowWaitingPayment";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getPaymentsByAccountID } from "../../apis/paymentApis";
import LoadingData from "../../components/loading/loadingData";
import Paging from "../../components/pagination/pagination";
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
      if (parts.length === 2) return parts.pop().split(";").shift();
   }

   const fetchPayments = async () => {
      const tokenValue = getCookie("token");
      const accountId = localStorage.getItem("accountId");
      const data = await getPaymentsByAccountID(accountId);
      // .then((response) => {
      //    setPayments(response);
      //    setFilteredPayments(response);
      //    setData(response.slice(0, 5));
      // });

      setPayments(data.data);
      setFilteredPayments(data.data);
      setData(data.data.slice(0, 5));
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
   useEffect(() => {
      if (searchValue != "") {
         setData(filteredPayments);
      }
   }, [filteredPayments]);
   useEffect(() => {
      if (searchValue == "") {
         setData(payments.slice(0, 5));
      }
   }, [searchValue]);
   return (
      <>
         <div className="w-[100%]">
            <div className="bg-[white] h-[calc(100%_-_180px)]">
               <section className="bg-white dbg-gray-900 py-3 sm:py-5">
                  <div className="px-4 mx-auto max-w-screen-2xl lg:px-12 mt-[10px]">
                     <div className="relative overflow-hidden bg-white  dbg-gray-800 ">
                        {/* <div className="h-[40px] w-[500px] mb-[20px]">
                           <input
                    type="text"
                    placeholder="Enter Find Payments By AccountID,Username or Phone"
                    value={searchValue}
                    onChange={(e) => findOrders(e.target.value)}
                    className="p-[5px] h-[40px] w-[500px] bg-gray-200 rounded-[10px] border-[1px] border-[gray]"
                  />
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
                        </div> */}
                        {/* <div className="flex items-center space-x-4 mt-4">
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
                        </div> */}
                        <h5 className="text-2xl mb-5">Wating payment</h5>

                        <div className="overflow-x-auto mb-5 shadow-md">
                           {filteredPayments?.length > 0 ? (
                              <table className="w-full text-sm text-left text-gray-500 dtext-gray-400">
                                 <thead className="text-xs text-gray-700 uppercase bg-gray-200 dbg-gray-700 dtext-gray-400">
                                    <tr>
                                       <th scope="col" className="px-4 py-3">
                                          Info Payment
                                       </th>

                                       <th scope="col" className="px-4 py-3">
                                          <div className="w-[100%] flex ">
                                             From Date
                                          </div>
                                       </th>
                                       <th scope="col" className="px-4 py-3">
                                          <div className="w-[100%] flex">
                                             Expiration Date
                                          </div>
                                       </th>
                                       <th scope="col" className="px-4 py-3">
                                          <div className="w-[100%] flex">
                                             <div className=" mr-[20px]">
                                                Price
                                             </div>
                                          </div>
                                       </th>

                                       <th scope="col" className="px-4 py-3">
                                          Payment method
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {data?.map((item) => {
                                       if (
                                          Date.parse(item.createdDate) <=
                                             Date.now() &&
                                          Date.parse(item.expirationDate) >=
                                             Date.now() &&
                                          item.status == false
                                       )
                                          return (
                                             <RowTableUserWaitingPayment
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

                        <h5 className="text-2xl mb-5">All payment</h5>
                        <div className="overflow-x-auto shadow-md">
                           {filteredPayments?.length > 0 ? (
                              <table className="w-full text-sm text-left text-gray-500 dtext-gray-400">
                                 <thead className="text-xs text-gray-700 uppercase bg-gray-200 dbg-gray-700 dtext-gray-400">
                                    <tr>
                                       <th scope="col" className="px-4 py-3">
                                          Info Payment
                                       </th>

                                       <th scope="col" className="px-4 py-3">
                                          <div className="w-[100%] flex ">
                                             From Date
                                          </div>
                                       </th>
                                       <th scope="col" className="px-4 py-3">
                                          <div className="w-[100%] flex">
                                             Expiration Date
                                          </div>
                                       </th>
                                       <th scope="col" className="px-4 py-3">
                                          <div className="w-[100%] flex">
                                             <div className=" mr-[20px]">
                                                Price
                                             </div>
                                          </div>
                                       </th>
                                       <th
                                          scope="col"
                                          className="px-4 py-3 flex"
                                       >
                                          <button
                                             onClick={filterStatus}
                                             className="flex justify-center items-center"
                                          >
                                             <FunnelIcon className="h-6 w-6 text-gray-500" />
                                             <div>Status</div>
                                          </button>
                                       </th>
                                       {/* <th scope="col" className="px-4 py-3">
                            Payment method
                          </th> */}
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {data?.map((item) => {
                                       return (
                                          <RowTableUserPayment
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
