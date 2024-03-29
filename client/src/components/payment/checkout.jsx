import axios from "axios";
import { useState, useEffect } from "react";
import { formatDate } from "../../helpers/dataHelper";

function CheckOut() {
   const [data, setData] = useState([]);
   const [check, setCheck] = useState(0);

   const authFetch = axios.create({
      baseURL: "https://localhost:44384/api",
      headers:{
         "Authorization": `Bearer ${getCookie("token")}`
      }
   });
   
   function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
   }
   const getData = async (accountId) => {
      const data = await authFetch.get(`/Payments/GetPaymenOfUser/${accountId}`);
      setData(data.data);
      console.log(data.data);
   };
   const GetLinkCheckOut = async (paymentId, requestId) => {
      const data = await authFetch.post("/Payments/GetLinkCheckOut", {
         paymentId: paymentId,
         requestId: requestId,
      });
      window.open(data.data, "_blank", "noreferrer");
   };
   useEffect(() => {
      const accountId = localStorage.getItem("accountId")
      getData(accountId);
   }, []);
   return (
      <>
         <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
            <h5 className="text-2xl mb-5">Payment period</h5>
            <section className="mb-20 text-gray-800 ">
               <div className="block rounded-lg shadow-lg bg-white">
                  <div className="flex flex-col">
                     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                           <div className="overflow-hidden">
                              <table className="min-w-full mb-0">
                                 <thead className="border-b rounded-t-lg text-left bg-slate-200">
                                    <tr>
                                       <th
                                          scope="col"
                                          className="rounded-tl-lg text-medium text-blue-600 font-medium px-6 py-4"
                                       >
                                          Info Payment
                                       </th>
                                       <th
                                          scope="col"
                                          className="text-medium text-blue-600 font-medium px-6 py-4"
                                       >
                                          From Date
                                       </th>
                                       <th
                                          scope="col"
                                          className="text-medium text-blue-600 font-medium px-6 py-4"
                                       >
                                          Expiration Date
                                       </th>
                                       <th
                                          scope="col"
                                          className="text-medium text-blue-600 font-medium px-6 py-4"
                                       >
                                          Status
                                       </th>
                                       <th
                                          scope="col"
                                          className="rounded-tr-lg text-medium text-blue-600 font-medium px-6 py-4"
                                       >
                                          Type
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {data.map((item, index) => {
                                       if (
                                          Date.parse(item.createdDate) <=
                                             Date.now() &&
                                          Date.parse(item.expirationDate) >=
                                             Date.now() &&
                                          item.status == false
                                       ) {
                                          // setCheck(81);
                                          return (
                                             <tr
                                                key={index}
                                                className={
                                                   index % 2 === 0
                                                      ? "border-b bg-gray-100"
                                                      : "border-b"
                                                }
                                             >
                                                <th
                                                   className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                                   scope="row"
                                                >
                                                   {item.note}
                                                </th>
                                                <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                                                   {formatDate(
                                                      item.createdDate
                                                   )}
                                                </td>
                                                <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                                                   {formatDate(
                                                      item.expirationDate
                                                   )}
                                                </td>
                                                <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                                                   Wating payment
                                                </td>

                                                <td className="text-large font-normal px-6 py-4 whitespace-nowrap">
                                                   <a
                                                      target="_blank"
                                                      // rel="noopener noreferrer"
                                                      onClick={() => {
                                                         GetLinkCheckOut(
                                                            item.paymentId,
                                                            item.requestId
                                                         );
                                                      }}
                                                      type="button"
                                                      className="text-gray-900 bg-[#F7BE38] hover:cursor-pointer hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
                                                      style={{
                                                         fontSize: "12px",
                                                      }}
                                                   >
                                                      <svg
                                                         className="mr-2 -ml-1 w-4 h-4"
                                                         aria-hidden="true"
                                                         focusable="false"
                                                         data-prefix="fab"
                                                         data-icon="paypal"
                                                         role="img"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 384 512"
                                                      >
                                                         <path
                                                            fill="currentColor"
                                                            d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                                                         ></path>
                                                      </svg>
                                                      Check out with PayPal
                                                   </a>
                                                </td>
                                             </tr>
                                          );
                                       }
                                    })}
                                    {check == 0 && (
                                       <tr
                                          key={1}
                                          className={"border-b bg-gray-100"}
                                       >
                                          <td
                                             className="text-sm font-medium px-6 py-4 whitespace-nowrap text-center"
                                             scope="row"
                                             colspan="5"
                                          >
                                             No Info
                                          </td>
                                       </tr>
                                    )}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <h5 className="text-2xl mb-5">All payment</h5>
            <section className="mb-20 text-gray-800 ">
               <div className="block rounded-lg shadow-lg bg-white">
                  <div className="flex flex-col">
                     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                           <div className="overflow-hidden">
                              <table className="min-w-full mb-0">
                                 <thead className="border-b rounded-t-lg text-left bg-slate-200">
                                    <tr>
                                       <th
                                          scope="col"
                                          className="rounded-tl-lg text-medium text-blue-600 font-medium px-6 py-4"
                                       >
                                          Info Payment
                                       </th>
                                       <th
                                          scope="col"
                                          className="text-medium text-blue-600 font-medium px-6 py-4"
                                       >
                                          From Date
                                       </th>
                                       <th
                                          scope="col"
                                          className="text-medium text-blue-600 font-medium px-6 py-4"
                                       >
                                          Expiration Date
                                       </th>
                                       <th
                                          scope="col"
                                          className="text-medium text-blue-600 font-medium px-6 py-4"
                                       >
                                          Status
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {data.map((item, index) => {
                                       return (
                                          <tr
                                             key={index}
                                             className={
                                                index % 2 === 0
                                                   ? "border-b bg-gray-100"
                                                   : "border-b"
                                             }
                                          >
                                             <th
                                                className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                                scope="row"
                                             >
                                                {item.note}
                                             </th>
                                             <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                                                {formatDate(item.createdDate)}
                                             </td>
                                             <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                                                {formatDate(
                                                   item.expirationDate
                                                )}
                                             </td>
                                             <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                                                {item.status == true
                                                   ? "Complete"
                                                   : Date.parse(
                                                        item.createdDate
                                                     ) <= Date.now() &&
                                                     Date.parse(
                                                        item.expirationDate
                                                     ) < Date.now()
                                                   ? "Payment expires"
                                                   : Date.parse(
                                                        item.createdDate
                                                     ) <= Date.now() &&
                                                     Date.parse(
                                                        item.expirationDate
                                                     ) >= Date.now()
                                                   ? "Wating payment"
                                                   : "Upcomming Payment"}
                                             </td>
                                          </tr>
                                       );
                                    })}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
}

export default CheckOut;
