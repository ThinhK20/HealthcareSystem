// LayoutRoute.jsx
import Navbar from "../../components/header/navbar";
import Footer from "../footer/footer";
import React, { useState, useEffect } from "react";
const LayoutIndexRoute = ({ element }) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         const currentPosition = window.scrollY;
         setIsVisible(currentPosition > 200);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };
   return (
      <div className="w-[100%]">
         <header className="flex justify-center">
            <Navbar></Navbar>
         </header>
         <div className="min-h-[90vh] w-[100%]  mx-auto flex">
            <div className=" mx-auto flex w-full">{element}</div>
         </div>
         <footer>
            <Footer></Footer>
         </footer>
      </div>
   );
};

export default LayoutIndexRoute;
