import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/header/navbar";
import Footer from "../footer/footer";
import React, { useState, useEffect } from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Page403 from "../../pages/Error/page403";

const ProtectLayoutRoute = ({ element,allowedRoles  }) => {
    const userRole = localStorage.getItem("Role");
    if (!allowedRoles?.includes(userRole)) {
      return  <Page403></Page403>;
    }
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
                   className="bg-gray-500 hover:bg-gray-600 opacity-80  h-[50px] w-[50px] rounded-full"
                   style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      zIndex: 1000,
                   }}
                >
                   <FontAwesomeIcon
                      icon={faChevronUp}
                      className="text-[white] font-[800]"
                   />
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

 export default ProtectLayoutRoute;