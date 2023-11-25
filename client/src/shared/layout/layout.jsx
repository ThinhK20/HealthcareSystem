// LayoutRoute.jsx
import React from "react";
import Navbar from "../../components/header/navbar";
import Footer from "../footer/footer";

const LayoutRoute = ({ element }) => {
    return (
        <div className="w-[100%]">
            <header className="flex justify-center">
                <Navbar></Navbar>
            </header>
            <div className=" min-h-[90vh] w-[100%]  flex justify-center px-[50px]">
            <div className="w-[100%] my-[50px]">
                {element}

            </div>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default LayoutRoute;
