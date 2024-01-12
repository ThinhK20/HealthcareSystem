import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { login, loginByGoogle, generateToken } from "../../apis/authenicationApis";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { createUserGoogle } from "../../apis/accountApis";
import LoadingWrapper from "../../components/loading/loading";
import { getAllUsers } from "../../apis/userApis";
import { getAccounts } from "../../apis/accountApis";
import backgroundImg from "../../../public/background.svg"
function generateRandomString(length) {
   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let result = "";

   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
   }

   return result;
}

function generateRandomUsername() {
   return "user_" + generateRandomString(12);
}

function generateRandomPassword() {
   return generateRandomString(12);
}
export default function Login() {
   const navigateTo = useNavigate();
   const [loading, setLoading] = useState(false);

   const usernameRef = useRef(null);
   const passRef = useRef(null);
   const config = {
      headers: {
         "content-type": "application/json",
         "Access-Control-Allow-Origin": "*",
      },
   };

   const responseGoogle = async (response) => {
      const decodeToken = await jwt.jwtDecode(response.credential);
      console.log(decodeToken);
      const data = {
         userId: 0,
         fullname: decodeToken.family_name + " " + decodeToken.given_name,
         email: decodeToken.email,
         cccd: null,
         phone: null,
         birthdate: null,
         address: null,
         gender: null,
      };
      setLoading(true);
      const createUser = await createUserGoogle(data);
      if (createUser.email != "Exist") {
         console.log("Vo dayyyyyyy");
         const randomUsername = generateRandomUsername();
         const randomPassword = generateRandomPassword();
         const data_user = {
            userName: randomUsername,
            password: randomPassword,
            email: decodeToken.email,
            confirmPassword: null,
         };
         console.log(data_user);
         const api_login = await loginByGoogle(data_user);
         setLoading(false);

         console.log(api_login);

         localStorage.setItem("token", api_login);

         toast.success("Login successfully !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
         });
         setTimeout(() => {
            navigateTo("/");
         }, 3000);
      } else {
         const getUsers = await getAllUsers();
         const filteredUsers = getUsers.filter(user => decodeToken.email === user.email);
         console.log("Filter : ", filteredUsers)
         const accountData = await getAccounts();
         const filteredAccount = accountData.filter(account => filteredUsers[0].userId === account.userId);
         console.log("Account Filter : ", filteredAccount[0].username)
         const username = filteredAccount[0].username
         console.log(username, username.startsWith("user_"))
         if(username.startsWith("user_")){
            const payload = {
               role: filteredAccount[0].role,
               userId: filteredAccount[0].userId
            };
            const token = await generateToken(payload);
            setLoading(false);
            console.log("Token hereeeeee: ", token)
            localStorage.setItem("token", token);
            toast.success("Login successfully !", {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
            });
            setTimeout(() => {
               navigateTo("/");
            }, 3000);
         }
         else{
            setLoading(false)
            toast.error("Email existed", {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
            });
         }
         
      }
   };

   const handleSubmit = async (event) => {
      setLoading(true);
      event.preventDefault();
      console.log(usernameRef.current?.value, passRef.current?.value);

      const accountInfo = {
         userName: usernameRef.current?.value,
         password: passRef.current?.value,
      };
      const loginAPI = await login(accountInfo, config);
      console.log(1111, loginAPI);
      setLoading(false);
      const token = loginAPI.token || loginAPI;
      if (
         token == "User not found" ||
         token == "User is disable" ||
         token == "Username or password is wrong"
      ) {
         toast.error(token, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
         });
      } else {
         const decodeToken = await jwt.jwtDecode(token);
         console.log(token, decodeToken);
         localStorage.setItem("token", token);

         toast.success("Login successfully !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
         });
         setTimeout(() => {
            navigateTo("/");
         }, 3000);
      }
   };
   return (
      <>
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
                           <GoogleOAuthProvider
                              clientId="690489564858-mubja10tgqpnj887i80paove637qhfqq.apps.googleusercontent.com"
                              buttonText="Login with Google"
                           >
                              <GoogleLogin
                                 buttonText="Login with Google"
                                 onSuccess={responseGoogle}
                                 onFailure={responseGoogle}
                              />
                           </GoogleOAuthProvider>
                        </div>

                        <div className="my-12 border-b text-center">
                           <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                              Or Sign In With Your Account
                           </div>
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
                                 <span className="ml-4">Sign In</span>
                              </button>
                              <p className="mt-6 text-m text-gray-600 text-center">
                                 If you don't have account <br></br>
                                 <a
                                    href="/register"
                                    className="border-b border-gray-500 border-dotted"
                                 >
                                    Register Now !
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
         </div>
         <ToastContainer />
         <LoadingWrapper open={loading} />
      </>
   );
}
