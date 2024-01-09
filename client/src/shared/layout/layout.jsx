// LayoutRoute.jsx

import Navbar from "../../components/header/navbar";
import Footer from "../footer/footer";
import React, { useState, useEffect } from "react";
const LayoutRoute = ({ element }) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      // Thêm sự kiện cuộn để kiểm tra vị trí và hiển thị nút
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
      <div className="w-[100%] bg">
         <div
            style={{
               position: "fixed",
               bottom: "20px",
               right: "20px",
               zIndex: 999,
            }}
         >
            {isVisible && (
               <button
                  onClick={scrollToTop}
                  className="bg-[red]"
                  style={{
                     position: "absolute",
                     bottom: 0,
                     right: 0,
                     zIndex: 1000,
                  }}
               >
                  Scroll to Top
               </button>
            )}
            {/* Nội dung của component */}
         </div>
         <header className="flex justify-center">
            <Navbar></Navbar>
         </header>
         <div className="min-h-[90vh] w-[100%] container mx-auto flex">
            <div className="container mx-auto flex">{element}</div>
         </div>
         <footer>
            <Footer></Footer>
         </footer>
      </div>
   );
};

export default LayoutRoute;
