import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function FormUpdate() {
   const navigateTo = useNavigate();
   const location = useLocation();
   const { state } = location;
   const id = state?.id || "";
   const registerPlace = state?.registerPlace || "";
   const cardOpenDate = state?.cardOpenDate || "";
   const name = state?.user || "";

   const authFetch = axios.create({
      baseURL: "https://localhost:44384/api",
   });
   const registerPlaceRef = useRef();
   const cardOpenDateRef = useRef();
   const handleSubmit = async (e) => {
      e.preventDefault();
      const data_update = {
         insuranceID: id,
         registerPlace: registerPlaceRef.current.value,
         cardOpenDate: cardOpenDateRef.current.value,
      }
      console.log("Submitttttttt: ", data_update)
      const api_update = await authFetch.put(
         `/insurances`,
         data_update
      );
      console.log(22222222222, api_update);
      
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
      console.log(name, id ,registerPlace, cardOpenDate );
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
                              Update the insurance of {name}
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="Please enter the name of insuarance policy"
                                    required
                                    defaultValue={
                                       registerPlace
                                    }
                                    ref={registerPlaceRef}
                                 />
                                 <label
                                    htmlFor="name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                 >
                                    Register Place
                                 </label>
                              </div>
                              <div className="relative z-0 w-full mb-5 group">
                                 <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="Please enter the description of insuarance policy"
                                    ref={cardOpenDateRef}
                                    defaultValue={
                                       cardOpenDate
                                    }
                                    required
                                 />
                                 <label
                                    htmlFor="description"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                 >
                                    Card Open Date
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
                              Update
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
