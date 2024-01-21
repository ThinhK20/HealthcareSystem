import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../../apis/authenicationApis";
import LoadingWrapper from "../../components/loading/loading";
import backgroundImg from "../../../public/background.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
export default function Register() {
   const navigateTo = useNavigate();
   const [loading, setLoading] = useState(false);

   const usernameRef = useRef(null);
   const passRef = useRef(null);
   const confirmPasswordRef = useRef(null);
   const emailRef = useRef(null);

   const config = {
      headers: {
         "content-type": "application/json",
         "Access-Control-Allow-Origin": "*",
      },
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const accountInfo = {
         userName: usernameRef.current?.value,
         password: passRef.current?.value,
         email: emailRef.current?.value,
         confirmPassword: confirmPasswordRef.current?.value,
      };
      console.log(555555, accountInfo);

      if (passRef.current?.value != confirmPasswordRef.current?.value) {
         toast.error("Password not match", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
         });
      } else {
         setLoading(true);
         const registerAPI = await register(accountInfo, config);
         setLoading(false);

         console.log(registerAPI);

         if (
            registerAPI == "User existed" ||
            registerAPI == "User existed" ||
            registerAPI == "Email is not valid" ||
            registerAPI == "Email existed"
         ) {
            toast.error(registerAPI, {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
            });
         } else {
            const message = "Register successfully !";

            toast.success(message, {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
            });
            console.log(registerAPI.emailVerification, registerAPI.status);
            setTimeout(() => {
               navigateTo("/verify", {
                  state: {
                     emailVerification: registerAPI.emailVerification,
                     status: registerAPI.status,
                     userid: registerAPI.userId,
                  },
               });
            }, 3000);
         }
      }
   };
   return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center w-full">
         <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
               <div>
                  <img
                        src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
                        className="w-mx-auto"
                  />
               </div>
               <div className="mt-12 flex flex-col items-center">
                  <div className="w-full flex-1 mt-8">
                     <div className="flex flex-col items-center">
                        <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                           <div className="bg-white p-2 rounded-full">
                              <FontAwesomeIcon icon={faPenToSquare}/>
                           </div>
                           <span className="ml-4 " >
                             
                              
                              Fill in your information
                           </span>
                        </button>
                     </div>

                     <div className="my-12 border-b text-center">
                        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
                     </div>
                     <form action="#" onSubmit={handleSubmit}>
                        <div className="mx-auto max-w-xs">
                           <input
                              ref={usernameRef}
                              name="username"
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                              type="text"
                              placeholder="Username"
                           />
                           <input
                              ref={passRef}
                              name="password"
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              type="password"
                              placeholder="Password"
                           />
                           <input
                              ref={confirmPasswordRef}
                              name="confirm"
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              type="password"
                              placeholder="Confirm Password"
                           />
                           <input
                              ref={emailRef}
                              name="password"
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              type="email"
                              placeholder="Email"
                           />

                           <button
                              type="submit"
                              className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                           >
                              <svg
                                 className="w-6 h-6 -ml-2"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              >
                                 <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                 <circle cx="8.5" cy="7" r="4" />
                                 <path d="M20 8v6M23 11h-6" />
                              </svg>
                              <span className="ml-4">Sign Up</span>
                           </button>
                           <p className="mt-6 text-m text-gray-600 text-center">
                              <a
                                 href="/login"
                                 className="border-b border-gray-500 border-dotted"
                              >
                                 Back To Login
                              </a>
                           </p>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
            <div className="flex-1 bg-green-100 text-center hidden lg:flex">
               <div
                  className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                  style={{
                     "background-image":
                        `url(${backgroundImg})`,
                  }}
               ></div>
            </div>
         </div>
         <ToastContainer />
         <LoadingWrapper open={loading} />
      </div>
   );
}
