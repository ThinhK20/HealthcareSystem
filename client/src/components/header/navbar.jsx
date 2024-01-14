import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
   Typography,
   Button,
   IconButton,
   Collapse,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faFaceAngry,
   faFaceGrimace,
   faHouse,
   faPhone,
} from "@fortawesome/free-solid-svg-icons";
import LoadingWrapper from "../loading/loading";
import * as jwt from "jwt-decode";
import { getAccounts } from "../../apis/accountApis";
import { getAccountByUserID } from "../../apis/accountApis";
import { getAccountByAccountId } from "../../apis/accountApis";
const routes = [
   {
      role: "User",
      name: "Request",
      path: "/users/customer-requests",
      dropdown: false,
   },
   {
      role: "User",
      name: "Refund",
      path: "/users/refund-requests",
      dropdown: true,
      content: [
         {
            name: "Create ",
            path: "/users/refund-requests/create",
            icon: faHouse,
         },
         {
            name: "Your Request",
            path: "/users/refund-requests",
            icon: faHouse,
         },
      ],
   },
   {
      role: "User",
      name: "Insurance Packages",
      // path: "/users/refund-requests",
      dropdown: true,
      content: [
         {
            name: "Basic Package",
            path: "/users/refund-requests/create",
            icon: faHouse,
         },
         {
            name: "Standard Package",
            path: "/users/refund-requests",
            icon: faHouse,
         },
         {
            name: "Premium Package",
            path: "/users/refund-requests",
            icon: faHouse,
         },
      ],
   },

   {
      role: "User",
      name: "Account",
      path: "",
      dropdown: true,
      content: [
         {
            name: "Edit Information",
            path: "/users/edit-information",
            icon: faHouse,
         },
         {
            name: "Change Password",
            path: "/users/edit-account",
            icon: faHouse,
         },
      ],
   },
   {
      role: "User",
      name: "Payment",
      path: "",
      dropdown: true,
      content: [
         {
            name: "Your Payment",
            path: "/users/payment",
            icon: faHouse,
         },
      ],
   },
   {
      role: "Staff",
      name: "Manage",
      path: "/staffs/payment",
      dropdown: true,
      content: [
         {
            name: "Accounts",
            path: "/staffs/manage-account",
            icon: faHouse,
         },
         {
            name: "Requests",
            path: "/staffs/customer-requests",
            icon: faHouse,
         },
         {
            name: "Payments",
            path: "/staffs/payment",
            icon: faHouse,
         },
         {
            name: "Refunds",
            path: "/staffs/refund-requests",
            icon: faHouse,
         },
      ],
   },

   {
      role: "Staff",
      name: "Insurances",
      path: "/staffs/table-insurance-management",
      dropdown: true,
      content: [
         {
            name: "Insurance ",
            path: "/staffs/table-insurance-management",
         },
         {
            name: "Package Policies ",
            path: "/staffs/package-policy",
         },
         {
            name: "Create New Package Policies ",
            path: "/staffs/package-policy/create",
         },
      ],
   },
   {
      role: "Staff",
      name: "New Account",
      path: "/staffs/create-staff-account/",
      dropdown: false,
   },
   {
      role: "Staff",
      name: "Statistic",
      path: "/staffs/statistic",
      dropdown: false,
   },
   {
      role: "All",
      name: "About us",
      path: "/about-us",
      dropdown: false,
   },
];

export function Navbar() {
   const [openNav, setOpenNav] = useState(false);
   const [currentRole, setCurrentRole] = useState("All");
   const [detail, setDetail] = useState();
   const [username, setUsername] = useState();
   const [stateButton, setStateButton] = useState(true);
   function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
   }
   useEffect(() => {
      const Decode = async () => {
         const token = getCookie("token")
         if(token === undefined){
            setStateButton(true);
            localStorage.clear()
         }
         else{
            console.log("Logged")
            const accountId = await getAccountByUserID(localStorage.getItem("userId"));
            localStorage.setItem("accountId", accountId.data)
            const info = await getAccountByAccountId(accountId.data);
            setUsername(localStorage.getItem("username"))
            setCurrentRole(info.role ? info.role : "All");
            setStateButton(false);
         }
        
      };

      Decode();
   }, []);
   const handleHover = (drop, ct) => {
      if (drop == true) {
         setDetail(ct);
         console.log("CT: ", ct);
      }
   };

   const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 h-full ">
         {routes
            .filter((item) => item.role === currentRole || item.role === "All")
            .map(({ name, path, dropdown, content }) => (
               <Typography
                  key={name}
                  as="li"
                  variant="small"
                  color="inherit"
                  className="capitalize relative hover-to-display h-full flex justify-center items-center"
                  onMouseEnter={() => handleHover(dropdown, content)}
               >
                  <Link
                     to={path}
                     className="relative z-[100000000] group px-4 py-2 transition-all duration-300 ease-in-out bg-transparent border-b-1 border-transparent hover:border-black"
                  >
                     <span className="relative z-10 font-medium"> {name}</span>
                     <span className="absolute w-full inset-x-0 bottom-0  h-1 bg-black transform origin-bottom-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out group-hover:min-w-full"></span>
                  </Link>
                  {
                     <div
                        className="w-full transition-[700] hidden absolute hover-to-show  h-full -bottom-4 right-full   z-50 px-4 py-8 pt-20"
                        onMouseEnter={() => setOpenMenu(true)}
                     >
                        <div className="flex flex-col  bg-transparent  last:rounded-b-lg">
                           {detail?.map((item, key) => (
                              <>
                                 <Link
                                    to={item.path}
                                    key={key}
                                    class="flex gap-4 items-center text-[16px] min-w-[300px] p-3 z-10  hover:bg-gray-200 shadow-lg first:rounded-t-lg last:rounded-b-lg  bg-white "
                                 >
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                       <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <span className="font-[600]">
                                       {item.name}
                                    </span>
                                 </Link>
                              </>
                           ))}
                        </div>
                     </div>
                  }
               </Typography>
            ))}
      </ul>
   );

   React.useEffect(() => {
      window.addEventListener(
         "resize",
         () => window.innerWidth >= 960 && setOpenNav(false)
      );
   }, []);

   return (
      <div className="p-0 w-full mb-[30px]">
         <div className="h-[30px] bg-[#FFE280] w-full flex justify-around items-center">
            <div className="   font-serif text-[14px]">
               Contact us for a quote <strong> 1800 599998</strong>
            </div>
            <div className="grid gap-[15px] grid-cols-3 text-[12px]">
               <Link to={"/information-company"}>
                  <FontAwesomeIcon icon={faPhone} className="mr-1" />
                  Contact
               </Link>
               <Link to={"/about-us"} className="fab">
                  <FontAwesomeIcon icon={faFaceGrimace} className="mr-1" />
                  About us
               </Link>
            </div>
         </div>

         <div className="flex items-center justify-between text-black bg-[#FFD000] w-full h-[80px]">
            <Link to="/">
               <Typography className="ml-4 cursor-pointer font-bold flex">
                  <img
                     className="w-[80px] h-[80px]"
                     src="https://cdn.discordapp.com/attachments/1160172654825840763/1182623713401786368/22671099-c291-40f9-8c62-14e44a282e8e-removebg-preview.png?ex=65855f29&is=6572ea29&hm=70cc6922ca608eaa28d6e71e8ee2b07ad8bb042e2aee58d51008f4f2a7c03b6b&"
                     alt=""
                  />
                  <div className="text-center m-auto ml-1">
                     <p className="font-serif border-b-2 border-gray-800">
                        HEALTH{" "}
                     </p>
                     <p className="font-serif font-[400] text-[18]">
                        Solutions
                     </p>
                  </div>
               </Typography>
            </Link>
            <div className="hidden lg:block h-full">{navList}</div>

            <div className="hidden gap-2 lg:flex">
               {stateButton ? (
                  <>
                     <Link to="/register" target="_blank">
                        <Button
                           variant="text"
                           size="sm"
                           fullWidth
                           className="hover:bg-[#545455] hover:text-[white]"
                        >
                           Sign Up
                        </Button>
                     </Link>
                     <Link to="/login" target="_blank">
                        <Button
                           variant="gradient"
                           size="sm"
                           className="hover:bg-[#545455] mr-[100px] lg:w-fit w-full"
                        >
                           Login
                        </Button>
                     </Link>
                  </>
               ) : (
                  <>
                  <p className="font-serif border-b-2 border-gray-800 mr-10">
                        Hi, {" "} {username}
                  </p>
                  <Link to="/" target="_blank">
                     <Button
                        variant="gradient"
                        size="sm"
                        className="hover:bg-[#545455] mr-[100px] lg:w-fit w-full"
                        onClick={() => {
                           localStorage.clear();
                           console.log(stateButton, 8888);
                           document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';   
                           setStateButton(true);
                        }}
                     >
                        Log out
                     </Button>
                  </Link>
                  </>
               )}
            </div>

            <IconButton
               variant="text"
               size="sm"
               color="white"
               className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
               onClick={() => setOpenNav(!openNav)}
            >
               {openNav ? (
                  <XMarkIcon strokeWidth={2} className="h-6 w-6" />
               ) : (
                  <Bars3Icon strokeWidth={2} className="h-6 w-6" />
               )}
            </IconButton>
         </div>

         <Collapse open={openNav} className=" rounded-lg ">
            <div className="container mx-auto rounded-xl">
               {navList}
               {stateButton ? (
                  <>
                     <Link
                        to="/register"
                        target="_blank"
                        className="mb-2 block"
                     >
                        <Button variant="text" size="sm" fullWidth>
                           Sign Up
                        </Button>
                     </Link>
                     <Link to="/login" target="_blank" className="mb-2 block">
                        <Button
                           variant="text"
                           size="sm"
                           className="bg-[#545455]"
                           fullWidth
                        >
                           Login
                        </Button>
                     </Link>
                  </>
               ) : (
                  <Link to="/" target="_blank" className="mb-2 block">
                     <Button
                        variant="text"
                        size="sm"
                        className="bg-[#545455]"
                        fullWidth
                        onClick={() => {
                           localStorage.clear();
                           console.log(stateButton, 8888);
                           setStateButton(true);
                        }}
                     >
                        Log out
                     </Button>
                  </Link>
               )}
            </div>
         </Collapse>
      </div>
   );
}

export default Navbar;
