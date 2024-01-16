import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateInsurance } from "../../apis/insuranceApis";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
export default function FormUpdate() {
   const navigateTo = useNavigate();
   const location = useLocation();
   const { state } = location;
   const id = state?.id || "";
   const registerPlace = state?.registerPlace || "";
   const cardOpenDate = state?.cardOpenDate || "";
   const name = state?.user || "";
   const registerPlaceRef = useRef();
   const [startDate, setStartDate] = useState(Date.parse(cardOpenDate));

   const handleSubmit = async (e) => {
      e.preventDefault();
      const data_update = {
         insuranceID: id,
         registerPlace: registerPlaceRef.current.value,
         cardOpenDate:
            startDate.getFullYear() +
            "-" +
            (startDate.getMonth() + 1) +
            "-" +
            startDate.getDate(),
      };
      console.log("Submitttttttt: ", data_update);
      const api_update = await updateInsurance(data_update);
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
      console.log(name, id, registerPlace, cardOpenDate);
   }, []);

   return (
      <>
         <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 w-full">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
               <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                  <div className="max-w-md mx-auto pt-10 pb-10">
                     <div className="flex items-center space-x-5">
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700 w-full">
                           <h2 className="leading-relaxed text-blue-600 text-center w-full pb-14">
                              Update the insurance of {name}
                           </h2>
                        </div>
                     </div>
                     <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                           <form className="max-w-lg mx-auto">
                              <div className="relative z-0 w-full mb-5 group">
                                 <label
                                    htmlFor="name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                 >
                                    Register Place
                                 </label>
                                 <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="Please enter the name of insuarance policy"
                                    required
                                    defaultValue={registerPlace}
                                    ref={registerPlaceRef}
                                 />
                              </div>
                              <div className="relative z-0 w-full mb-5 group">
                                 <label
                                    htmlFor="description"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                 >
                                    Card Open Date
                                 </label>
                                 <div style={{ width: "100%" }}>
                                    <DatePicker
                                       portalId="my-popper"
                                       wrapperClassName="custom-datepicker"
                                       name="description"
                                       id="description"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       selected={startDate}
                                       onChange={(date) => setStartDate(date)}
                                       required
                                    />
                                 </div>
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
