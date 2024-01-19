import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { verifyEmail } from "../../apis/authenicationApis";
export default function EmailVerify() {
   const navigateTo = useNavigate();

   const inputone = useRef(null);
   const inputtwo = useRef(null);
   const inputthree = useRef(null);
   const inputfour = useRef(null);
   const location = useLocation();

   const handleSubmit = async (event) => {
      event.preventDefault();
      const status = location.state?.status || "";
      const numberverify = location.state?.emailVerification || "";
      const userid = location.state?.userid || "";
      const config = {
         headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
         },
      };
      console.log(66666666);
      if (status == "Disable") {
         const stringInput =
            String(inputone.current.value) +
            String(inputtwo.current.value) +
            String(inputthree.current.value) +
            String(inputfour.current.value);
         console.log(stringInput);
         if (stringInput == numberverify) {
            console.log(stringInput);
            console.log(userid);

            const verifyAPI = await verifyEmail(userid, config);
            if (verifyAPI == "Successfully") {
               toast.success("Verify Successfully !", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
               });
               setTimeout(() => {
                  navigateTo("/login");
               }, 3000);
            }
         }
      }
   };

   return (
      <div className="w-[100%] flex items-center justify-center min-h-screen p-5 bg-gray-600 min-w-screen">
         <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12 ">
            <h3 className="text-2xl">Thanks for signing up</h3>
            <div className="flex justify-center">
               <svg
                  className="w-32 h-32"
                  viewBox="0 0 50 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M42.2285 0C40.3812 4.92e-05 38.7061 0.741775 37.4785 1.94141H18.4102C18.3787 1.94141 18.3493 1.94909 18.3184 1.95117C18.1298 1.94236 17.9327 1.91521 17.6641 1.97656C17.5086 2.01156 17.3074 2.10876 17.1797 2.28516C17.052 2.46106 17.0156 2.66417 17.0156 2.85547V3.20898C17.0101 3.25944 17 3.30955 17 3.36133V4.11719L17.0156 4.12695V19.9551C17.0156 20.1414 17.0477 20.3306 17.1484 20.502C17.2492 20.6734 17.4182 20.7996 17.5723 20.8613C17.8803 20.9847 18.1304 20.9551 18.3789 20.9551H45.6523C46.0097 20.9551 46.3585 20.8387 46.6152 20.5977C46.872 20.3565 47.0156 19.9997 47.0156 19.627V11.6309C48.2595 10.3975 49.0312 8.69075 49.0312 6.80469C49.0313 3.05339 45.9798 0 42.2285 0ZM42.2285 1C45.4394 1 48.0313 3.59389 48.0312 6.80469C48.0312 10.0156 45.4394 12.6074 42.2285 12.6074C39.0177 12.6074 36.4238 10.0156 36.4238 6.80469C36.4238 3.59389 39.0176 1.0001 42.2285 1ZM42.2285 1.91992C39.5376 1.91992 37.3457 4.11389 37.3457 6.80469C37.3457 9.49559 39.5377 11.6874 42.2285 11.6875C44.9194 11.6875 47.1113 9.49559 47.1113 6.80469C47.1114 4.11389 44.9194 1.91992 42.2285 1.91992ZM42.2285 2.91992C44.379 2.91992 46.1113 4.65429 46.1113 6.80469C46.1113 8.95509 44.3789 10.6875 42.2285 10.6875C40.0781 10.6874 38.3457 8.95509 38.3457 6.80469C38.3457 4.65429 40.0781 2.91992 42.2285 2.91992ZM18.3496 2.95312C18.3775 2.9531 18.3771 2.95312 18.4102 2.95312H36.625C35.8693 4.04923 35.4238 5.37598 35.4238 6.80469C35.4238 8.17802 35.8362 9.45503 36.5391 10.5254L32.2715 13.6211L32.2539 13.6387C32.1417 13.7387 32.0985 13.7439 32.0605 13.7441C32.0226 13.7443 31.9342 13.7282 31.7715 13.6094L18.043 3.61328L18.0156 3.5957V3.27734C18.0495 3.10235 18.1792 2.97857 18.3496 2.95312ZM44.6426 4.63672C44.513 4.63827 44.389 4.69009 44.2969 4.78125L41.1934 7.77148L40.1602 6.77539C40.1131 6.72883 40.0574 6.69206 39.996 6.66721C39.9347 6.64236 39.8691 6.62993 39.8029 6.63064C39.7368 6.63134 39.6714 6.64517 39.6106 6.67132C39.5498 6.69747 39.4949 6.73542 39.4489 6.78298C39.4028 6.83053 39.3667 6.88674 39.3426 6.94835C39.3185 7.00996 39.3068 7.07575 39.3083 7.1419C39.3098 7.20805 39.3244 7.27324 39.3513 7.33371C39.3782 7.39417 39.4167 7.4487 39.4648 7.49414L40.8457 8.82617C40.9389 8.91579 41.0631 8.96586 41.1924 8.96586C41.3217 8.96586 41.4459 8.91579 41.5391 8.82617L44.9902 5.5C45.0632 5.43099 45.1137 5.34161 45.1351 5.2435C45.1565 5.14539 45.1479 5.04311 45.1104 4.94995C45.0729 4.8568 45.0082 4.7771 44.9248 4.72124C44.8413 4.66537 44.743 4.63592 44.6426 4.63672V4.63672ZM18.0156 4.83203L31.1836 14.418C31.4501 14.6121 31.7434 14.7459 32.0664 14.7441C32.3894 14.7441 32.6876 14.5913 32.918 14.3867L37.1523 11.3164C38.3998 12.7173 40.2098 13.6074 42.2285 13.6074C43.6296 13.6074 44.9323 13.18 46.0156 12.4512V19.627C46.0156 19.7646 45.9788 19.8212 45.9297 19.8672C45.8806 19.9132 45.7986 19.9551 45.6523 19.9551H18.3789C18.1652 19.9551 18.0614 19.9415 18.0156 19.9375V4.83203Z"
                     fill="url(#paint0_linear)"
                  />
                  <rect y="5" width="15" height="2" rx="1" fill="#3BB54A" />
                  <rect y="11" width="15" height="2" rx="1" fill="#3BB54A" />
                  <rect y="8" width="6" height="2" rx="1" fill="#3BB54A" />
                  <rect y="15" width="6" height="2" rx="1" fill="#3BB54A" />
                  <rect
                     x="8"
                     y="8"
                     width="6"
                     height="2"
                     rx="1"
                     fill="#3BB54A"
                  />
                  <rect
                     x="8"
                     y="15"
                     width="6"
                     height="2"
                     rx="1"
                     fill="#3BB54A"
                  />
                  <defs>
                     <linearGradient
                        id="paint0_linear"
                        x1="16.9996"
                        y1="10.4791"
                        x2="47.0156"
                        y2="10.4791"
                        gradientUnits="userSpaceOnUse"
                     >
                        <stop stopColor="#009217" />
                        <stop offset="1" stopColor="#00FF29" />
                     </linearGradient>
                  </defs>
               </svg>
            </div>
            <p>
               We're happy you're here. Let's get your email address verified:
            </p>
            <form className="pt-3 max-w-sm mx-auto" onSubmit={handleSubmit}>
               <div className="flex mb-2 space-x-2 rtl:space-x-reverse justify-center">
                  <div>
                     <label htmlFor="code-1" className="sr-only">
                        First code
                     </label>
                     <input
                        ref={inputone}
                        type="text"
                        maxLength="1"
                        id="code-1"
                        className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="code-2" className="sr-only">
                        Second code
                     </label>
                     <input
                        ref={inputtwo}
                        type="text"
                        maxLength="1"
                        id="code-2"
                        className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="code-3" className="sr-only">
                        Third code
                     </label>
                     <input
                        ref={inputthree}
                        type="text"
                        maxLength="1"
                        id="code-3"
                        className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="code-4" className="sr-only">
                        Fourth code
                     </label>
                     <input
                        ref={inputfour}
                        type="text"
                        maxLength="1"
                        id="code-4"
                        className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                     />
                  </div>
               </div>
               <p
                  id="helper-text-explanation"
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400"
               >
                  Please introduce the 4 digit code we sent via email.
               </p>
               <div className="mt-4">
                  <button
                     type="submit"
                     className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                     Verify
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
