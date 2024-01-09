import React from "react";
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
   faPhone,
} from "@fortawesome/free-solid-svg-icons";
import LoadingWrapper from "../loading/loading";

const routes = [
   {
      name: "Personal ",
      path: "/staffs/create-staff-account",
      icon: HomeIcon,
   },
   {
      name: "Accounts",
      path: "/staffs/manage-account",
      icon: HomeIcon,
   },
];

export function Navbar({ action }) {
   const [openNav, setOpenNav] = React.useState(false);

   const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 p-[5px] ">
         {routes.map(({ name, path }) => (
            <Typography
               key={name}
               as="li"
               variant="small"
               color="inherit"
               className="capitalize p-[2px] rounded-md"
            >
               <Link
                  to={path}
                  className="relative group px-4 py-2 transition-all duration-300 ease-in-out bg-transparent border-b-1 border-transparent hover:border-black"
               >
                  <span className="relative z-10 font-medium">{name}</span>
                  <span className="absolute w-full inset-x-0 bottom-0 h-1 bg-black transform origin-bottom-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out group-hover:min-w-full"></span>
               </Link>
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
               <Link to={"#"}>
                  <FontAwesomeIcon icon={faPhone} className="mr-1" />
                  Contact
               </Link>
               <Link to={"#"} className="fab">
                  <FontAwesomeIcon icon={faFaceGrimace} className="mr-1" />
                  About us
               </Link>
               <Link to={"https://example.com/"} className="">
                  <FontAwesomeIcon icon={faFaceAngry} className="mr-1" />
                  For You
               </Link>
            </div>
         </div>
         <div className="flex items-center justify-between text-black bg-[#FFD000] w-full">
            <Link to="/">
               <Typography className="ml-4 cursor-pointer font-bold flex">
                  <img
                     className="w-[80px] h-[80px]"
                     src="https://cdn.discordapp.com/attachments/1160172654825840763/1182623713401786368/22671099-c291-40f9-8c62-14e44a282e8e-removebg-preview.png?ex=65855f29&is=6572ea29&hm=70cc6922ca608eaa28d6e71e8ee2b07ad8bb042e2aee58d51008f4f2a7c03b6b&"
                     alt=""
                  />
                  <div className="text-center m-auto ml-1">
                     <p className="font-serif border-b-2 border-gray-800">
                        HEALTIH{" "}
                     </p>
                     <p className="font-serif font-[400] text-[18]">
                        Solutions
                     </p>
                  </div>
               </Typography>
            </Link>
            <div className="hidden lg:block">{navList}</div>
            <div className="hidden gap-2 lg:flex">
               <Link
                  href="https://www.material-tailwind.com/blocks?ref=mtkr"
                  target="_blank"
               >
                  <Button
                     variant="text"
                     size="sm"
                     fullWidth
                     className="hover:bg-[#545455] hover:text-[white]"
                  >
                     Sign Up
                  </Button>
               </Link>
               {React.cloneElement(action, {
                  className: "hidden lg:inline-block",
               })}
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
               <Link
                  href="https://www.material-tailwind.com/blocks/react?ref=mtkr"
                  target="_blank"
                  className="mb-2 block"
               >
                  <Button variant="text" size="sm" fullWidth>
                     Sign Up
                  </Button>
               </Link>
               {React.cloneElement(action, {
                  className: "w-full block",
               })}
            </div>
         </Collapse>
      </div>
   );
}

Navbar.defaultProps = {
   brandName: "HEALTIH Solutions",
   action: (
      <Link href="" target="_blank">
         <Button
            variant="gradient"
            size="sm"
            className="hover:bg-[#545455] mr-[100px] lg:w-fit w-full"
         >
            Login
         </Button>
      </Link>
   ),
};

export default Navbar;
