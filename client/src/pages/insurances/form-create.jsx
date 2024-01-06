import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { createInsurance } from "../../apis/insuranceApis";
import { getAccountByUserID } from "../../apis/accountApis";
export default function FormCreate() {
   const navigateTo = useNavigate();
   const location = useLocation();
   const { state } = location;
   const userNoInsuarance = state?.userNoInsuarance;

   const [selectedUserId, setSelectedUserId] = useState(0);

   const handleSelectChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedUserId(selectedValue);

      // You can perform additional actions with the selected value if needed
      console.log("Selected User ID:", selectedValue);
   };
   const registerPlaceRef = useRef();
   const cardOpenDateRef = useRef();
   const handleSubmit = async (e) => {
      e.preventDefault();
      const accountid = await getAccountByUserID(selectedUserId);
      const data = {
         registerPlace: registerPlaceRef.current.value,
         cardOpenDate: cardOpenDateRef.current.value,
         accountId: accountid.data,
      };
      console.log("Submitttttttt: ", data);
      const api = await createInsurance(data);
      console.log(22222222222, api);

      toast.success("Success", {
         position: "top-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
      });
      setTimeout(() => {
         navigateTo("/insurances");
      }, 3000);
   };
   useEffect(() => {
      console.log(userNoInsuarance, 66666666);
   }, []);

   return (
      <>
         <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 w-full">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
               <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                  <div className="max-w-md mx-auto">
                     <div className="flex items-center space-x-5">
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                           <h2 className="leading-relaxed text-blue-600">
                              Create a new insurance
                           </h2>
                        </div>
                     </div>
                     <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                           <form className="max-w-lg mx-auto">
                              <div className="relative z-0 w-full mb-5 group">
                                 <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    required
                                    ref={registerPlaceRef}
                                 />
                                 <label
                                    htmlFor="name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                 >
                                    Register Place
                                 </label>
                              </div>
                              <div className="relative z-0 w-full mb-5 group">
                                 <input
                                     datepicker
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    ref={cardOpenDateRef}
                                    required
                                 />
                                 <label
                                    htmlFor="description"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                 >
                                    Card Open Date
                                 </label>
                              </div>
                              <div className="relative z-0 w-full mb-5 group pt-5">
                                 <select
                                    value={selectedUserId}
                                    onChange={handleSelectChange}
                                    id="underline_select"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none da:text-gray-400 da:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                 >
                                    <option value="" disabled selected>
                                       Choose a user
                                    </option>

                                    {userNoInsuarance.map((user) => (
                                       <option
                                          key={user.userId}
                                          value={user.userId}
                                       >
                                          {user.fullname}
                                       </option>
                                    ))}
                                 </select>
                                 <label
                                    htmlFor="description"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                 >
                                    Choose Users
                                 </label>
                              </div>
                           </form>
                        </div>
                        <div className="pt-4 flex items-center space-x-4">
                           <button
                              type="button"
                              onClick={handleSubmit}
                              className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                           >
                              Create
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
